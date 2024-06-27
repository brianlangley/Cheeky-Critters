// Import Phaser framework and scene modules
import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene";
import MenuScene from "./scenes/MenuScene";
import GameScene from "./scenes/GameScene";

// Define the MainGame class to initialise and configure the game
class MainGame {
  constructor() {
    // Game configuration object
    const config = {
      type: Phaser.AUTO, // Automatically detect the rendering context
    // Ensure the game canvas is resized to fit the screen
    scale: {
      mode: Phaser.Scale.FIT, 
      autoCenter: Phaser.Scale.CENTER_BOTH, 
      width: window.innerWidth, 
      height: window.innerHeight, 
    },
    physics: {
        // Physics engine configuration
        default: "arcade",
        arcade: {
          gravity: { y: 300 }, // Gravity applied to the game objects
          debug: false,
        },
      },
      scene: [PreloadScene, MenuScene, GameScene], // List of game scenes/states for the game
    };

    // Define the game object using the configuration object
    new Phaser.Game(config);
  }
}

// Instantiate the MainGame class to start the game
new MainGame();
