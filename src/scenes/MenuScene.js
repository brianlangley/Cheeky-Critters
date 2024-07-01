import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    // For testing, skip menu and scene directly to the game
    // this.scene.start("GameScene");

    // Uncomment when deploying to production
    this.cameras.main.setBackgroundColor("#1A1818");

    const instructionText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 2,
        "Press mouse down to begin",
        {
          fontFamily: "Arial",
          fontSize: "32px",
          color: "#ffffff",
        }
      )
      .setOrigin(0.5);

    const bestEdLogo = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "BestEdLogo")
      .setScale(0.2)
      .setAlpha(0);

    const brianLogo = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "BrianLogo")
      .setScale(0.5)
      .setAlpha(0);

    const bestEdMusic = this.sound.add("BestEdMusic", { loop: false });
    const brianMusic = this.sound.add("BrianMusic", { loop: false });

    // click on body element to trigger the music
    document.body.addEventListener("mousedown", () => {
      instructionText.destroy(); // Remove the instruction text
      this.playLogoSequence(bestEdLogo, bestEdMusic, brianLogo, brianMusic);
    });
  }

  playLogoSequence(bestEdLogo, bestEdMusic, brianLogo, brianMusic) {
    this.tweens.add({
      targets: bestEdLogo,
      alpha: 1,
      duration: 2000,
      onComplete: () => {
        bestEdMusic.play();
        this.time.delayedCall(bestEdMusic.duration * 500, () => {
          this.tweens.add({
            targets: bestEdLogo,
            alpha: 0,
            duration: 2000,
            onComplete: () => {
              brianMusic.play();
              this.tweens.add({
                targets: brianLogo,
                alpha: 1,
                duration: 2000,
                onComplete: () => {
                  this.time.delayedCall(brianMusic.duration * 500, () => {
                    this.tweens.add({
                      targets: brianLogo,
                      alpha: 0,
                      duration: 2000,
                      onComplete: () => {
                        this.showMainMenu();
                      },
                    });
                  });
                },
              });
            },
          });
        });
      },
    });
  }

  showMainMenu() {
    const themeMusic = this.sound.add("menuTheme", {
      loop: false,
      volume: 0.3,
    });

    this.cameras.main.fadeIn(2000);
    themeMusic.play();

    // Assuming the spritesheet for the GIF has been loaded correctly in the preload method
    // Create the sprite from the loaded spritesheet
    const bg = this.add.sprite(0, 0, "menuBackground").setOrigin(0, 0);

    // Calculate the scale ratio to make the background fill the width
    const scaleRatio = this.scale.width / bg.width;
    bg.setScale(scaleRatio).setScrollFactor(0);

    // Adjust the height position based on the new scale
    bg.y = (this.scale.height - bg.height * scaleRatio) / 2;

    // Create an animation from the spritesheet if not already created
    if (!this.anims.get("menuBackgroundAnim")) {
      this.anims.create({
        key: "menuBackgroundAnim",
        frames: this.anims.generateFrameNumbers("menuBackground", {
          start: 0,
          end: 0,
        }), // Adjust end frame based on your spritesheet
        frameRate: 10, // Adjust according to the desired animation speed
        repeat: -1, // Loop forever
      });
    }

    // Play the created animation
    bg.play("menuBackgroundAnim");

    this.startButton = this.add
      .text(this.scale.width / 2, this.scale.height / 4, "Start", {
        fontFamily: "Arial",
        fontSize: "48px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        themeMusic.stop(); // Stop the music
        this.cameras.main.fadeOut(1000, 0, 0, 0, () => {
          this.scene.start("GameScene");
        });
      });

    this.add
      .image(this.scale.width - 100, this.scale.height - 100, "BestEdLogo")
      .setScale(0.1);
  }
}
