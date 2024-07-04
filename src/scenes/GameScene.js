import Phaser from "phaser";
import Cannon from "../objects/Cannon";
import Structure from "../objects/Structure";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.cameras.main.fadeIn(1000);
    this.sound.play("ambience", { loop: true, volume: 0.2 });

    const backgrounds = [
      "background1",
      "background2",
      "background3",
      "background4",
    ];
    const grounds = ["ground1", "ground2", "ground3"];
    const backgroundTexture = Phaser.Utils.Array.GetRandom(backgrounds);
    const groundTexture = Phaser.Utils.Array.GetRandom(grounds);

    const bg = this.add.image(0, 0, backgroundTexture).setOrigin(0, 0);
    bg.displayWidth = this.scale.width;
    bg.displayHeight = this.scale.height;

    const groundHeight = this.scale.height * 0.25;
    const ground = this.add
      .tileSprite(
        0,
        this.scale.height - groundHeight,
        this.scale.width,
        groundHeight,
        groundTexture
      )
      .setOrigin(0, 0);

    this.physics.add.existing(ground, true);
    ground.body.setSize(this.scale.width, groundHeight, false).setOffset(0, 0);
    ground.body.immovable = true;

    this.ground = ground;

    this.cannon = new Cannon(this, 100, this.scale.height - groundHeight - 50);

    this.structures = this.physics.add.group();

    this.createHouseStructure();

    this.physics.world.gravity.y = 600;

    this.physics.add.collider(this.structures, this.ground);
    this.physics.add.collider(this.structures, this.structures);

// Ensure both this.cannon.projectile and this.structures exist before adding the collider
if (this.cannon && this.cannon.projectile && this.structures) {
    this.physics.add.collider(
      this.cannon.projectile,
      this.structures,
      this.handleProjectileStructureCollision,
      null,
      this
    );
} else {
    console.warn('Projectile or structures are undefined, collider not added');
}
  }

  // Add this method to handle the collision
  handleProjectileStructureCollision(projectile, structure) {
    structure.handleProjectileCollision(projectile);
  }

  createHouseStructure() {
    const baseX = Phaser.Math.Between(600, this.scale.width - 200);
    const baseY = this.scale.height - this.ground.height;
    const wallHeight = 150;

    const createBeam = (x, y, rotation) => {
      const beam = this.createStructurePart(x, y, "rectangle", rotation);
      this.structures.add(beam); // Add beam to structures group here
    };

    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

    createBeam(baseX - 90, baseY - wallHeight, degreesToRadians(0));
    createBeam(baseX + 90, baseY - wallHeight, degreesToRadians(0));
    createBeam(baseX, baseY - wallHeight * 2, degreesToRadians(90));
  }

  createStructurePart(x, y, type, rotation = 0) {
    const part = new Structure(this, x, y, type);
    part.setRotation(rotation);
    return part; // Return the part without adding to the group here
  }

  update() {

      if (this.cannon.projectile) {
        this.physics.collide(
          this.cannon.projectile,
          this.structures,
          this.handleProjectileStructureCollision,
          null,
          this
        );
      }
  }
}
