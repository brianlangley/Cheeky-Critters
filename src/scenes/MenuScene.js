import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
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
    const themeMusic = this.sound.add("theme", { loop: false, volume: 0.5 });

    this.cameras.main.fadeIn(2000);
    themeMusic.play();

    this.add
      .image(this.scale.width / 2, this.scale.height / 2, "menuBackground")
      .setScale(1);

    this.startButton = this.add
      .text(this.scale.width / 2, this.scale.height / 2, "Start", {
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
