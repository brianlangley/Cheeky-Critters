import Phaser from "phaser";

export default class Cannon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;

    this.barrel = scene.add.sprite(x, y, "cannonBarrel").setOrigin(0.3, 0.5);
    this.base = scene.add.sprite(x, y, "cannonBase").setOrigin(0.3, -0.3);
    this.barrel.setInteractive();

    this.base.setScale(0.1);
    this.barrel.setScale(0.1);

    this.aimLine = this.scene.add.graphics();
    this.aimLine.setDefaultStyles({
      lineStyle: { width: 2, color: 0xff0000, alpha: 0.5 },
    });

    this.aimLine.setDepth(1);
    this.base.setDepth(3);
    this.barrel.setDepth(2);

    this.startPointerX = 0;
    this.startPointerY = 0;
    this.maxPower = 1000;
    this.currentPower = 0;

    this.setupEvents();
  }

  setupEvents() {
    this.scene.input.on("pointerdown", this.onPointerDown, this);
    this.scene.input.on("pointermove", this.onPointerMove, this);
    this.scene.input.on("pointerup", this.onPointerUp, this);
  }

  onPointerDown(pointer) {
    if (this.barrel.getBounds().contains(pointer.x, pointer.y)) {
      this.startPointerX = pointer.x;
      this.startPointerY = pointer.y;
      this.isDragging = true;
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

    const barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
    const barrelEndX = this.x + Math.cos(angle) * barrelLength;
    const barrelEndY = this.y + Math.sin(angle) * barrelLength;

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

  drawTrajectory(startX, startY, angle, power) {
    const points = [];
    const gravity = 1200;
    const steps = 60;
    const timeStep = 1 / 60;

    const velocityMultiplier = 1.5;

    let velocityX = Math.cos(angle) * power * velocityMultiplier;
    let velocityY = Math.sin(angle) * power * velocityMultiplier;

    for (let i = 0; i < steps; i++) {
      points.push({ x: startX, y: startY });

      startX += velocityX * timeStep;
      startY += velocityY * timeStep;
      velocityY += gravity * timeStep;

      if (startY > this.scene.ground.body.y) {
        break;
      }
    }

    this.aimLine.lineStyle(2, 0xff0000, 0.5);
    this.aimLine.beginPath();
    this.aimLine.moveTo(points[0].x, points[0].y);

    for (let i = 1; i < points.length; i++) {
      this.aimLine.lineTo(points[i].x, points[i].y);
    }

    this.aimLine.strokePath();
  }

  shoot(pointer) {
    var barrelLength = this.barrel.width * this.barrel.scaleX * 0.7;
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

    // Add this at the end of the shoot method
    this.scene.time.delayedCall(3000, () => {
      if (this.scene.cannon.projectile && this.scene.cannon.projectile.active) {
        this.scene.handleMissedShot();
      }
    });
  }
}
