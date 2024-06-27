// Preload scene to handle loading assets

// Import the Phaser module
import Phaser from "phaser";

// Define the PreloadScene class that extends the Phaser.Scene class
export default class PreloadScene extends Phaser.Scene {
  // Constructor function to create the PreloadScene object
  constructor() {
    super("PreloadScene");
  }

  // Preload function to load assets before the game starts
  preload() {
    // Logos and audio assets

    // Best Educational
    this.load.image("BestEdLogo", "./assets/logo/Bit/logo.png");
    this.load.audio("BestEdMusic", "./assets/logo/Bit/sound.mp3");
    // My custom logo
  }

  // Create function to set up the game scene
  create() {
    // Start the MenuScene
    this.scene.start("MenuScene");
  }
}
