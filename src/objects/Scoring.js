export default class Scoring {
  constructor(scene) {
    this.scene = scene;
    this.score = 0;
    this.scoreText = this.scene.add
      .text(16, 16, "0", {
        fontSize: "32px",
        fill: "#ff0000",
      })
      .setOrigin(0, 0);
  }

  addScore(points) {
    this.score += points;
    this.scoreText.setText(this.score.toString());
    console.log("Score: ", this.score); // Log the score for verification
  }

  resetScore() {
    this.score = 0;
    this.scoreText.setText(this.score.toString());
    console.log("Score reset to 0");
  }

  getScore() {
    return this.score;
  }
}
