import Phaser from "phaser";

export default class Cannon {
  constructor(scene, x, y) {
    this.scene = scene;
    this.barrel = scene.add.sprite(x, y, "cannonBarrel").setOrigin(0.3, 0.5);
    this.base = scene.add.sprite(x, y, "cannonBase").setOrigin(0.3, 0);
    this.barrel.setInteractive();
    this.aimLine = this.scene.add.graphics({ x: 0, y: 0 }).setDepth(-1); // Ensure the aim line is behind the cannon
    this.aimLine.setAlpha(0.5);
    this.setupEvents();

    // Scale the cannon to a suitable size
    this.base.setScale(0.2);
    this.barrel.setScale(0.2);
  }

  setupEvents() {
    this.barrel.on("pointerdown", (pointer) => {
      this.scene.tweens.add({
        targets: this.aimLine,
        alpha: 0.5,
        duration: 200,
      });
      this.scene.input.on("pointermove", this.aim, this);
      this.scene.input.on("pointerup", this.shoot, this);
    });
  }

  aim(pointer) {
    this.aimLine.clear();
    const angle = Phaser.Math.Angle.Between(
      this.barrel.x,
      this.barrel.y,
      pointer.x,
      pointer.y
    );

    // Start the aim line from the base of the cannon
    const baseX = this.base.x;
    const baseY = this.base.y;

    this.aimLine.lineStyle(2, 0xff0000);
    this.aimLine.beginPath();
    this.aimLine.moveTo(baseX, baseY);
    this.aimLine.lineTo(pointer.x, pointer.y);
    this.aimLine.strokePath();
  }

  shoot(pointer) {
    this.scene.input.off("pointermove", this.aim, this);
    this.scene.input.off("pointerup", this.shoot, this);

    this.scene.tweens.add({
      targets: this.aimLine,
      alpha: 0,
      duration: 200,
      onComplete: () => {
        this.aimLine.clear();
      },
    });

    const velocity = 1500;
    const angle = this.barrel.rotation + Phaser.Math.DegToRad(90); // Correct the shooting direction

    // Shoot from the base of the cannon
    const baseX = this.base.x;
    const baseY = this.base.y;

    const projectile = this.scene.physics.add.image(baseX, baseY, "circle1");
    projectile.setVelocity(
      Math.cos(angle) * velocity,
      Math.sin(angle) * velocity
    );

    // Add collision and destroy logic
    this.scene.physics.add.collider(projectile, this.scene.ground, () => {
      const impactEffect = this.scene.add.sprite(
        projectile.x,
        projectile.y,
        "cannonImpact"
      );
      impactEffect.play("impact");
      // Fade out the impact effect
      this.scene.tweens.add({
        targets: impactEffect,
        alpha: 0,
        duration: 500,
        onComplete: () => {
          impactEffect.destroy();
        },
      });
      projectile.destroy();
      this.scene.sound.play("playerImpact1");
    });

    this.scene.sound.play("cannonShot");
    const shotEffect = this.scene.add.sprite(baseX, baseY, "cannonShot");
    shotEffect.play("shot");
    // Fade out the shot effect
    this.scene.tweens.add({
      targets: shotEffect,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        shotEffect.destroy();
      },
    });

    this.scene.sound.play("playerFlying");
  }
}
