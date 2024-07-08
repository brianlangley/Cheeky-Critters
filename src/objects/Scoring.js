export default class Scoring {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    // Set initial position for the score text
    const initialX = 100;
    const initialY = 50;
    this.scoreText = this.scene.add
      .text(initialX, initialY, `Score: ${this.score}`, {
        fontFamily: "AngryBirds",
        fontSize: "36px",
        fill: "#ff0000",
        backgroundColor: "#000000",
      })
      .setOrigin(0.5);
  }

  addScore(points) {
    this.score += points;
    if (this.score >= 5000) {
      // Create a black rectangle covering the whole scene
      const blackBackground = this.scene.add
        .rectangle(
          0,
          0,
          this.scene.scale.width,
          this.scene.scale.height,
          0x000000
        )
        .setOrigin(0);

      // Display Winner text on top of the black background
      const winnerText = this.scene.add
        .text(
          this.scene.scale.width / 2,
          this.scene.scale.height / 2,
          "Winner",
          {
            fontFamily: "AngryBirds",
            fontSize: "64px",
            fill: "#00ff00",
          }
        )
        .setOrigin(0.5);

      // Wait for a few seconds, then restart the game
      this.scene.time.delayedCall(3000, () => {
        winnerText.destroy();
        blackBackground.destroy(); // Remove the black background
        this.scene.restartGame(); // Assuming this method exists in GameScene
      });
    } else {
      this.scoreText.setText(`Score: ${this.score}`);
      this.updateScoreDisplay(); // Update the HTML score display
    }
    console.log("Score: ", this.score); // Log the score for verification
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(`Score: ${this.score}`);
    this.updateScoreDisplay(); // Update the HTML score display
    console.log("Score reset to 0");
  }

  getScore() {
    return this.score;
  }

  // Update score text position and value
  updateScoreDisplay() {
    const scoreElement = document.getElementById("score-display");
    if (scoreElement) {
      scoreElement.innerText = `Score: ${this.score}`;
    }
  }
}
