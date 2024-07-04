import Phaser from "phaser";

export default class Structure extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, type) {
    super(scene, x, y, `${type}1`);
    this.scene = scene;
    this.type = type;
    this.health = 100;
    this.maxHealth = 100;

    // Add the structure to the scene and enable physics
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    // Set up physics properties
    this.setCollideWorldBounds(true);
    this.setBounce(0);
    this.setFriction(1);

    // Enable collision with the ground
    this.scene.physics.add.collider(this, this.scene.ground);
  }

  damage(amount) {
    this.health -= amount;
    this.health = Math.max(0, this.health);
    this.updateTexture();

    if (this.health <= 0) {
      this.destroy();
    }
  }

  updateTexture() {
    let textureIndex;
    const healthPercentage = this.health / this.maxHealth;

    if (healthPercentage > 0.75) {
      textureIndex = 1;
    } else if (healthPercentage > 0.5) {
      textureIndex = 2;
    } else if (healthPercentage > 0.25) {
      textureIndex = 3;
    } else {
      textureIndex = 4;
    }

    this.setTexture(`${this.type}${textureIndex}`);
  }

  // Method to handle collision with projectile
  handleProjectileCollision(projectile) {
    // Calculate damage based on projectile velocity or other factors
    const damage = 25; // Adjust this value as needed
    this.damage(damage);

    // Destroy the projectile
    projectile.destroy();
  }
}
