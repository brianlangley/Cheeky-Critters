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
    this.scoreText.setText(`Score: ${this.score}`);
    console.log("Score: ", this.score); // Log the score for verification
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(`Score: ${this.score}`);
    console.log("Score reset to 0");
  }

  getScore() {
    return this.score;
  }
}
