import Phaser from "phaser";

export default class Cannon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.shotsLeft = 7;

    this.barrel = scene.add.sprite(x, y, "cannonBarrel").setOrigin(0.3, 0.5);
    this.base = scene.add.sprite(x, y, "cannonBase").setOrigin(0.3, -0.3);
    this.barrel.setInteractive(); // Interactive objects can listen to input events

    this.base.setScale(0.1);
    this.barrel.setScale(0.1);

    this.aimLine = this.scene.add.graphics();
    this.aimLine.setDefaultStyles({
      lineStyle: { width: 2, color: 0xff0000, alpha: 0.5 },
    });


    // Z-index to ensure that the aimline is drawn behind the cannon
    this.aimLine.setDepth(1);
    this.base.setDepth(3);
    this.barrel.setDepth(2);

    this.shotCounterText = this.scene.add
      .text(this.x + 50, this.y + 100, `Shots: ${this.shotsLeft}`, {
        fontSize: "36px",
        fill: "#ff0000",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5);

    this.startPointerX = 0;
    this.startPointerY = 0;
    this.maxPower = 1000;
    this.currentPower = 0;

    this.setupEvents();
  }

  // Add event listeners for the cannon
  setupEvents() {
    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointermove", this.onPointerMove, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(pointer) {
    if (
      this.barrel.getBounds().contains(pointer.x, pointer.y) &&
      this.shotsLeft > 0
    ) {
      this.startPointerX = pointer.x;
      this.startPointerY = pointer.y;
      this.isDragging = true; //  Dragging is when you click and hold the mouse button down while moving the mouse.
    }
  }

  onPointerMove(pointer) {
    if (this.isDragging) {
      this.aim(pointer);
    }
  }

  onPointerUp(pointer) {
    if (this.isDragging) {
      this.shoot(pointer);
      this.isDragging = false;
    }
  }

  aim(pointer) {
    this.aimLine.clear();

    // Calculate the angle between the cannon and the pointer
    let angle = Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y);
    angle = -angle;

    angle = Phaser.Math.Clamp(angle, 0, Phaser.Math.DegToRad(90));

    this.barrel.rotation = angle;

    const distance = Phaser.Math.Distance.Between(
      this.startPointerX,
      this.startPointerY,
      pointer.x,
      pointer.y
    );
    this.currentPower = Phaser.Math.Clamp(distance, 0, this.maxPower);
    // Power is the distance between the start and end points of the drag

    const barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
    const barrelEndX = this.x + Math.cos(angle) * barrelLength;
    const barrelEndY = this.y + Math.sin(angle) * barrelLength;

    // Draw the trajectory line, which is a visual representation of the path the projectile will take
    const trajectoryAngle = Phaser.Math.Angle.Between(
      this.x,
      this.y,
      pointer.x,
      pointer.y
    );

    this.drawTrajectory(
      barrelEndX,
      barrelEndY,
      trajectoryAngle,
      this.currentPower
    );
  }

  // Draw the trajectory line and ensures that a realistic path is drawn with a realistic arc
  drawTrajectory(startX, startY, angle, power) {
    const points = [];
    const gravity = 1200;
    const steps = 60;
    const timeStep = 1 / 60;

    // The velocityMultiplier is used to increase the velocity of aiming to make it more interactive
    const velocityMultiplier = 1.5;

    let velocityX = Math.cos(angle) * power * velocityMultiplier;
    let velocityY = Math.sin(angle) * power * velocityMultiplier;

    for (let i = 0; i < steps; i++) {
      points.push({ x: startX, y: startY });

      // Update the position of the projectile. This is done by adding the velocity to the position and then adding the gravity to the velocity
      startX += velocityX * timeStep;
      startY += velocityY * timeStep;
      velocityY += gravity * timeStep;

      if (startY > this.scene.ground.body.y) {
        break;
      }
    }

    this.aimLine.lineStyle(2, 0xff0000, 0.5);
    this.aimLine.beginPath();
    // Move the line to the starting point of the trajectory
    this.aimLine.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.aimLine.lineTo(points[i].x, points[i].y);
    }

    this.aimLine.strokePath();
  }

  shoot(pointer) {
    var barrelLength = this.barrel.width * this.barrel.scaleX * 0.7; // Var is used to ensure its accessible out of the scope
    var angle = this.barrel.rotation;
    const barrelEndX = this.x + Math.cos(angle) * barrelLength;
    const barrelEndY = this.y + Math.sin(angle) * barrelLength;

    const projectile = this.scene.physics.add.image(
      barrelEndX,
      barrelEndY,
      "player1"
    );

    projectile.setScale(0.5);
    this.scene.cannon.projectile = projectile;

    // Velocity of the projectile 
    const velocityMultiplier = 1.2;
    const velocity = this.currentPower * velocityMultiplier;

    projectile.setVelocity(
      Math.cos(-angle) * velocity,
      Math.sin(-angle) * velocity
    );

    projectile.body.setCircle(projectile.width / 2);
    projectile.body.setBounce(0.5);
    projectile.body.setFriction(0.1);

    let hasCollided = false;

    this.scene.physics.add.collider(projectile, this.scene.ground, () => {
      if (!hasCollided) {
        hasCollided = true;

        const impactEffect = this.scene.add.sprite(
          projectile.x,
          projectile.y,
          "cannonImpact"
        );
        impactEffect.play("impact");

        this.scene.tweens.add({
          targets: impactEffect,
          alpha: 0,
          duration: 1000,
          onComplete: () => {
            impactEffect.destroy();
          },
        });

        this.scene.sound.play("playerImpact1");

        projectile.setTexture("player2");

        projectile.body.setAngularVelocity(projectile.body.velocity.x);

        this.scene.time.delayedCall(2000, () => {
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

    this.scene.physics.add.collider(
      projectile,
      this.scene.structures,
      this.scene.handleProjectileStructureCollision,
      null,
      this.scene
    );

    // The code block above is responsible for the collision detection between the projectile and the ground and structures.

    this.scene.sound.play("cannonShot");
    barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
    angle = this.barrel.rotation;

    const effectOffset = 1.1;
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

    shotEffect.rotation = angle;

    this.scene.tweens.add({
      targets: shotEffect,
      alpha: 0,
      duration: 1000,
      onComplete: () => {
        shotEffect.destroy();
      },
    });

    this.scene.sound.play("playerFlying");
    this.aimLine.clear();

    this.shotsLeft -= 1;
    this.shotCounterText.setText(`Shots Left: ${this.shotsLeft}`);

    if (this.shotsLeft <= 0 && this.scene.enemies.countActive(true) > 0) {
      this.scene.gameOver();
    }
  }
}
