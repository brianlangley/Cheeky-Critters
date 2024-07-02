import Phaser from "phaser";
import Cannon from "../objects/Cannon";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: "GameScene" });
  }

  create() {
    this.cameras.main.fadeIn(1000);

    // Background music ambience loop
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

    // Add background
    const bg = this.add.image(0, 0, backgroundTexture).setOrigin(0, 0);
    bg.displayWidth = this.scale.width;
    bg.displayHeight = this.scale.height;

    // Add ground
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

    // Add physics to ground
    this.physics.add.existing(ground, true);
    ground.body.setSize(this.scale.width, groundHeight, false).setOffset(0, 0);
    ground.body.immovable = true;

    // Make ground accessible to Cannon class
    this.ground = ground;

    // Add cannon
    this.cannon = new Cannon(this, 100, this.scale.height - groundHeight - 50);
  }
}
