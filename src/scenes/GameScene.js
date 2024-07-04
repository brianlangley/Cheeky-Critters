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

    // Create the cannon
    this.cannon = new Cannon(this, 100, this.scale.height - groundHeight - 50);

    // Structures
    this.structures = this.physics.add.group();

    this.createHouseStructure();

    // Set world gravity
    this.physics.world.gravity.y = 600;

    // Collisions
    this.physics.add.collider(this.structures, this.ground);
    this.physics.add.collider(this.structures, this.structures);
  }

  createHouseStructure() {
    const baseX = 600;
    const baseY = this.scale.height - this.ground.height;
    const width = 50;
    const height = 25;

    // Create base floor
    for (let i = 0; i < 5; i++) {
      this.createStructurePart(baseX + i * width, baseY - height / 2, "rectangle", 0);
    }

    // Create left wall
    for (let i = 1; i <= 4; i++) {
      this.createStructurePart(baseX, baseY - i * height - height / 2, "rectangle", 0);
    }

    // Create right wall
    for (let i = 1; i <= 4; i++) {
      this.createStructurePart(baseX + 4 * width, baseY - i * height - height / 2, "rectangle", 0);
    }

    // Create roof
    for (let i = 0; i < 5; i++) {
      this.createStructurePart(baseX + i * width, baseY - 5 * height - height / 2, "rectangle", Math.PI / 4);
    }
  }

  createStructurePart(x, y, type, rotation = 0) {
    const part = new Structure(this, x, y, type);
    part.setRotation(rotation);
    this.structures.add(part);
    return part;
  }

  update() {
    if (this.cannon.projectile) {
      this.physics
        .overlapRect(
          this.cannon.projectile.x - 5,
          this.cannon.projectile.y - 5,
          10,
          10,
          false,
          true,
          this.structures.getChildren()
        )
        .forEach((structure) => {
          const velocity = this.cannon.projectile.body.velocity.length();
          structure.damage(Math.floor(velocity / 10));
          this.cannon.projectile.destroy();
        });
    }
  }
}
