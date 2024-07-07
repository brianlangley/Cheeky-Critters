import Phaser from "phaser";

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: "MenuScene" });
    this.logoSequenceCompleted = false;
  }

  create() {
    // For testing, skip menu and scene directly to the game
    this.scene.start("GameScene");

    // Uncomment when deploying to production
    
  //     this.cameras.main.setBackgroundColor("#1A1818");

  //     const instructionText = this.add
  //       .text(
  //         this.scale.width / 2,
  //         this.scale.height / 2,
  //         "Press mouse down to begin",
  //         {
  //           fontFamily: "Arial",
  //           fontSize: "32px",
  //           color: "#ffffff",
  //         }
  //       )
  //       .setOrigin(0.5);

  //     const bestEdLogo = this.add
  //       .image(this.scale.width / 2, this.scale.height / 2, "BestEdLogo")
  //       .setScale(0.2)
  //       .setAlpha(0);

  //     const brianLogo = this.add
  //       .image(this.scale.width / 2, this.scale.height / 2, "BrianLogo")
  //       .setScale(0.5)
  //       .setAlpha(0);

  //     this.bestEdMusic = this.sound.add("BestEdMusic", { loop: false });
  //     this.brianMusic = this.sound.add("BrianMusic", { loop: false });

  //     // click on body element to trigger the music
  //     document.body.addEventListener("mousedown", () => {
  //       if (!this.logoSequenceCompleted) {
  //         instructionText.destroy(); // Remove the instruction text
  //         this.playLogoSequence(
  //           bestEdLogo,
  //           this.bestEdMusic,
  //           brianLogo,
  //           this.brianMusic
  //         );
  //       }
  //     });
  //   }

  //   playLogoSequence(bestEdLogo, bestEdMusic, brianLogo, brianMusic) {
  //     const bestEdSlogan = this.add
  //       .text(
  //         this.scale.width / 2,
  //         this.scale.height / 2 + 100,
  //         "Wij lanceren je de toekomst in!",
  //         {
  //           fontFamily: "Arial",
  //           fontSize: "24px",
  //           color: "#ffffff",
  //         }
  //       )
  //       .setOrigin(0.5, -4)
  //       .setAlpha(0);
  //     this.tweens.add({
  //       targets: bestEdLogo,
  //       alpha: 1,
  //       duration: 2000,
  //       onStart: () => {
  //         this.tweens.add({
  //           targets: bestEdSlogan,
  //           alpha: 1,
  //           duration: 2000,
  //         });
  //       },
  //       onComplete: () => {
  //         bestEdMusic.play();
  //         this.time.delayedCall(bestEdMusic.duration * 500, () => {
  //           this.tweens.add({
  //             targets: [bestEdLogo, bestEdSlogan],
  //             alpha: 0,
  //             duration: 2000,
  //             // text under the logo
  //             onComplete: () => {
  //               brianMusic.play();
  //               this.tweens.add({
  //                 targets: brianLogo,
  //                 alpha: 1,
  //                 duration: 2000,
  //                 onComplete: () => {
  //                   this.time.delayedCall(brianMusic.duration * 500, () => {
  //                     this.tweens.add({
  //                       targets: brianLogo,
  //                       alpha: 0,
  //                       duration: 2000,
  //                       onComplete: () => {
  //                         this.logoSequenceCompleted = true;
  //                         this.showMainMenu();
  //                       },
  //                     });
  //                   });
  //                 },
  //               });
  //             },
  //           });
  //         });
  //       },
  //     });
  //   }

  //   showMainMenu() {
  //     const themeMusic = this.sound.add("menuTheme", {
  //       loop: false,
  //       volume: 0.2,
  //     });

  //     this.cameras.main.fadeIn(2000);
  //     themeMusic.play();

  //     const backgroundImage = this.add.image(
  //       this.scale.width / 2,
  //       this.scale.height / 2,
  //       "menuBackground"
  //     );

  //     // Calculate the scale factor to cover the screen
  //     const scaleX = this.scale.width / backgroundImage.width;
  //     const scaleY = this.scale.height / backgroundImage.height;
  //     const scale = Math.max(scaleX, scaleY);
  //     backgroundImage.setScale(scale).setScrollFactor(0);

  //     this.tweens.add({
  //       targets: backgroundImage,
  //       alpha: 1,
  //       scale: scale * 1.2, // Adjust the scale to zoom in
  //       duration: 2000,
  //       ease: "Power2",
  //     });

  //     // Create the button background
  //     this.startButtonBackground = this.add.graphics();
  //     this.startButtonBackground.fillStyle(0xff0000, 1);
  //     this.startButtonBackground.fillRoundedRect(
  //       this.scale.width / 2 - 150,
  //       (this.scale.height * 3) / 4 - 40,
  //       300,
  //       80,
  //       20
  //     );

  //     // Game start button
  //     this.startButtonText = this.add
  //       .text(this.scale.width / 2, (this.scale.height * 3) / 4, "Begin game", {
  //         fontFamily: "Arial",
  //         fontSize: "48px",
  //         color: "#ffffff",
  //       })
  //       .setOrigin(0.5)
  //       .setInteractive()
  //       .on("pointerdown", () => {
  //         // Stop music from playing more than once
  //         if (this.bestEdMusic.isPlaying) {
  //           this.bestEdMusic.stop();
  //         }
  //         if (this.brianMusic.isPlaying) {
  //           this.brianMusic.stop();
  //         }
  //         themeMusic.stop(); // Stop the menu theme music
  //         this.tweens.add({
  //           targets: [this.startButtonBackground, this.startButtonText],
  //           scaleX: 1,
  //           scaleY: 1,
  //           duration: 100,
  //           onComplete: () => {
  //             this.cameras.main.fadeOut(0, 0, 0, 0, () => {
  //               this.scene.start("GameScene");
  //             });
  //           },
  //         });
  //       });

  //     this.add
  //       .image(this.scale.width - 100, this.scale.height - 100, "BestEdLogo")
  //       .setScale(0.1);

  // End of uncomment
  }
}
