import Phaser from "phaser";
import Cannon from "../objects/Cannon";
import Structure from "../objects/Structure";
import Enemy from "../objects/Enemy";

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

    this.enemies = new Enemy(this, 0, 0, "enemy1").spawn(
      this,
      this.structures,
      this.ground
    );

    this.physics.world.gravity.y = 600;

    this.physics.add.collider(this.structures, this.ground);
    this.physics.add.collider(this.structures, this.structures);

    if (this.cannon && this.cannon.projectile) {
      this.physics.add.collider(
        this.cannon.projectile,
        this.structures,
        this.handleProjectileStructureCollision,
        null,
        this
      );
      this.physics.add.collider(
        this.cannon.projectile,
        this.enemies,
        this.handleProjectileEnemyCollision,
        null,
        this
      );
    }
  }

  handleProjectileStructureCollision(projectile, structure) {
    structure.handleProjectileCollision(projectile);
    this.handleProjectileCollision(projectile);
  }

  handleProjectileEnemyCollision(projectile, enemy) {
    enemy.damage();
    this.handleProjectileCollision(projectile);
  }

  handleProjectileCollision(projectile) {
    projectile.setBounce(0.5);
    projectile.setVelocity(
      projectile.body.velocity.x * -0.5,
      projectile.body.velocity.y * -0.5
    );
    this.sound.play("bounce");

    this.time.delayedCall(2000, () => {
      if (projectile) {
        projectile.destroy();
      }
    });
  }

  handleMissedShot() {
    if (this.enemies && this.enemies.getChildren().length > 0) {
      this.sound.play("taunt");
    }
  }

  createHouseStructure() {
    const baseX = Phaser.Math.Between(600, this.scale.width - 200);
    const baseY = this.scale.height - this.ground.height;
    const wallHeight = 150;

    const createBeam = (x, y, rotation) => {
      const beam = this.createStructurePart(x, y, "rectangle", rotation);
      this.structures.add(beam);
    };

    const degreesToRadians = (degrees) => degrees * (Math.PI / 180);

    createBeam(baseX - 90, baseY - wallHeight, degreesToRadians(0));
    createBeam(baseX + 90, baseY - wallHeight, degreesToRadians(0));
    createBeam(baseX, baseY - wallHeight * 2, degreesToRadians(90));
  }

  createStructurePart(x, y, type, rotation = 0) {
    const part = new Structure(this, x, y, type);
    part.setRotation(rotation);
    return part;
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
      if (this.enemies) {
        this.physics.collide(
          this.cannon.projectile,
          this.enemies,
          this.handleProjectileEnemyCollision,
          null,
          this
        );
      }
    }
  }
}
