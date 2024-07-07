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
    this.setCollideWorldBounds(true); // Ensure the object collides with world bounds
    this.setBounce(0.2); // Slight bounce to simulate tumble
    this.setFriction(10); // High friction to prevent sliding
    this.body.setAllowGravity(true); // Enable gravity for tumbling

    // Ensure the world bounds are set to the game's width and height
    this.scene.physics.world.setBounds(
      0,
      0,
      this.scene.sys.game.config.width,
      this.scene.sys.game.config.height
    );

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

  handleProjectileCollision(projectile) {
    const damage = 25;
    this.damage(damage);
  
    // Calculate the impact force based on the projectile's velocity
    const impactForce = Math.sqrt(projectile.body.velocity.x ** 2 + projectile.body.velocity.y ** 2);
  
    // Adjust the angle based on both health percentage and impact force
    const healthPercentage = this.health / this.maxHealth;
    let angleAdjustment = 0;
    if (healthPercentage > 0.75) {
      angleAdjustment = 0; // Slightly damaged, still standing straight
    } else if (healthPercentage > 0.5) {
      angleAdjustment = -10; // More damaged, starting to fall
    } else if (healthPercentage > 0.25) {
      angleAdjustment = -30; // Heavily damaged, falling further
    } else {
      angleAdjustment = -90; // Almost destroyed, lying flat
    }
  
    // Apply additional rotation based on the impact force
    // The magic numbers here (e.g., 1000, 0.05) can be adjusted based on gameplay testing for a more realistic effect
    const velocityBasedRotation = (impactForce / 1000) * 0.05 * angleAdjustment;
    this.setAngle(this.angle + angleAdjustment + velocityBasedRotation);
  }
}
