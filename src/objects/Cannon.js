import Phaser from "phaser";

export default class Cannon {
  constructor(scene, x, y) {
    // Initialize basic properties
    this.scene = scene;
    this.x = x;
    this.y = y;

    // Create cannon sprites
    this.barrel = scene.add.sprite(x, y, "cannonBarrel").setOrigin(0.3, 0.5);
    this.base = scene.add.sprite(x, y, "cannonBase").setOrigin(0.3, -0.3);
    this.barrel.setInteractive();

    // Scale the cannon parts
    this.base.setScale(0.1);
    this.barrel.setScale(0.1);

    // Create the aim line graphics object
    this.aimLine = this.scene.add.graphics();
    this.aimLine.setDefaultStyles({
      lineStyle: { width: 2, color: 0xff0000, alpha: 0.5 },
    });

    // Set depth for proper layering
    this.aimLine.setDepth(1);
    this.base.setDepth(3);
    this.barrel.setDepth(2);

    // Initialize aiming and power variables
    this.startPointerX = 0;
    this.startPointerY = 0;
    this.maxPower = 1000;
    this.currentPower = 0;

    this.setupEvents();
  }

  setupEvents() {
    // Set up input event listeners
    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointermove", this.onPointerMove, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(pointer) {
    // Check if the pointer is over the barrel
    if (this.barrel.getBounds().contains(pointer.x, pointer.y)) {
      // Store initial pointer position and start dragging
      this.startPointerX = pointer.x;
      this.startPointerY = pointer.y;
      this.isDragging = true;
    }
  }

  onPointerMove(pointer) {
    // Update aim if dragging
    if (this.isDragging) {
      this.aim(pointer);
    }
  }

  onPointerUp(pointer) {
    // Shoot if was dragging
    if (this.isDragging) {
      this.shoot(pointer);
      this.isDragging = false;
    }
  }

  aim(pointer) {
    // Clear previous aim line
    this.aimLine.clear();

    // Calculate the angle, keeping it reversed for correct cannon rotation
    let angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
    angle = -angle; // Reverse the angle for cannon rotation

    // Clamp the angle between 0 and 90 degrees (north to east)
    angle = Phaser.Math.Clamp(angle, 0, Phaser.Math.DegToRad(90));

    // Set the barrel rotation
    this.barrel.rotation = angle;

    // Calculate power based on drag distance
    const distance = Phaser.Math.Distance.Between(
      this.startPointerX,
      this.startPointerY,
      pointer.x,
      pointer.y
    );
    this.currentPower = Phaser.Math.Clamp(distance, 0, this.maxPower);

    // Calculate barrel end position
    const barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
    const barrelEndX = this.x + Math.cos(angle) * barrelLength;
    const barrelEndY = this.y + Math.sin(angle) * barrelLength;

    // Use the original angle for trajectory calculation
    const trajectoryAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.x,
      pointer.y
    );

    // Draw the trajectory starting from the barrel end
    this.drawTrajectory(
      barrelEndX,
      barrelEndY,
      trajectoryAngle,
      this.currentPower
    );
  }

  drawTrajectory(startX, startY, angle, power) {
    const points = [];
    const gravity = 1200;
    const steps = 60;
    const timeStep = 1 / 60;

    // Adjust the velocity multiplier to increase the range
    const velocityMultiplier = 1.5; // Increase this value to extend the trajectory

    // Calculate initial velocity components
    let velocityX = Math.cos(angle) * power * velocityMultiplier;
    let velocityY = Math.sin(angle) * power * velocityMultiplier;

    // Simulate projectile motion
    for (let i = 0; i < steps; i++) {
      points.push({ x: startX, y: startY });

      // Update position and velocity
      startX += velocityX * timeStep;
      startY += velocityY * timeStep;
      velocityY += gravity * timeStep;

      // Stop if the projectile goes below the ground
      if (startY > this.scene.ground.body.y) {
        break;
      }
    }

    // Draw the trajectory line
    this.aimLine.lineStyle(2, 0xff0000, 0.5);
    this.aimLine.beginPath();
    this.aimLine.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.aimLine.lineTo(points[i].x, points[i].y);
    }

    this.aimLine.strokePath();
  }

  shoot(pointer) {
    // Calculate projectile spawn position
    var barrelLength = this.barrel.width * this.barrel.scaleX * 0.7; // Var so that it can be read out of scope
    var angle = this.barrel.rotation;
    const barrelEndX = this.x + Math.cos(angle) * barrelLength;
    const barrelEndY = this.y + Math.sin(angle) * barrelLength;

    // Create and launch projectile
    const projectile = this.scene.physics.add.image(
      barrelEndX,
      barrelEndY,
      "player1"
    );

    projectile.setScale(0.5);

    // Use the same velocity multiplier as in drawTrajectory
    const velocityMultiplier = 0.8;
    const velocity = this.currentPower * velocityMultiplier;

    // Use the negative angle for correct projectile direction
    projectile.setVelocity(
      Math.cos(-angle) * velocity,
      Math.sin(-angle) * velocity
    );

    // Set the projectile body to be a circle for physics calculations
    projectile.body.setCircle(projectile.width / 2);
    projectile.body.setBounce(0.75); // Lower bounce for more realistic behavior
    projectile.body.setFriction(0.1); // Lower friction for better rolling

    let hasCollided = false;

    // Set up collision with ground
    this.scene.physics.add.collider(projectile, this.scene.ground, () => {
      if (!hasCollided) {
        hasCollided = true;

        // Create impact effect
        const impactEffect = this.scene.add.sprite(
          projectile.x,
          projectile.y,
          "cannonImpact"
        );
        impactEffect.play("impact");

        // Fade out impact effect
        this.scene.tweens.add({
          targets: impactEffect,
          alpha: 0,
          duration: 1000,
          onComplete: () => {
            impactEffect.destroy();
          },
        });

        // Play impact sound only once
        this.scene.sound.play("playerImpact1");

        // Change projectile to player2 sprite
        projectile.setTexture("player2");

        // Apply angular velocity to make it roll
        projectile.body.setAngularVelocity(projectile.body.velocity.x);

        // After 2 seconds of impact, destroy the projectile
        this.scene.time.delayedCall(2000, () => {
          // Fade out the projectile
          this.scene.tweens.add({
            targets: projectile,
            alpha: 0,
            duration: 500,
            onComplete: () => {
              projectile.destroy();
            },
          });
        });
      }
    });

    // Play cannon shot effects from the barrel end
    this.scene.sound.play("cannonShot");
    barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
    angle = this.barrel.rotation;

    const effectOffset = 1.1; // Adjust this value slightly above 1 if needed
    const shotEffectX =
      this.x + Math.cos(angle) * (barrelLength * effectOffset);
    const shotEffectY =
      this.y + Math.sin(angle) * (barrelLength * effectOffset - 200);

    const shotEffect = this.scene.add.sprite(
      shotEffectX,
      shotEffectY,
      "cannonShot"
    );
    shotEffect.play("shot");

    // Rotate shot effect to match the cannon angle
    shotEffect.rotation = angle;

    // Fade out shot effect
    this.scene.tweens.add({
      targets: shotEffect,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        shotEffect.destroy();
      },
    });

    this.scene.sound.play("playerFlying");
    // Clear aim line after shooting
    this.aimLine.clear();
  }
}
