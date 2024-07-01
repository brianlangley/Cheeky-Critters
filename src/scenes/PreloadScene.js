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
    // Logos
    // Best Educational
    this.load.image("BestEdLogo", "./assets/logo/Bit/logo.png");
    this.load.audio("BestEdMusic", "./assets/logo/Bit/sound.mp3");

    // My custom logo
    this.load.image("BrianLogo", "./assets/logo/Brian/logo.png");
    this.load.audio("BrianMusic", "./assets/logo/Brian/sound.mp3");

    // Load game assets (background, ground, characters, enemies, structures, etc)
    // Backgrounds
    this.load.image("background1", "./assets/textures/background/01.jpg");
    this.load.image("background2", "./assets/textures/background/02.jpg");
    this.load.image("background3", "./assets/textures/background/03.jpg");
    this.load.image("background4", "./assets/textures/background/04.jpg");
   this.load.spritesheet(
     "menuBackground",
     "./assets/textures/background/menuBackground.gif",
     {
       frameWidth: 1024,
       frameHeight: 1024,
       endFrame: 0,
     }
   );

   // Ground
   this.load.image("ground1", "./assets/textures/ground/01.jpg");
   this.load.image("ground2", "./assets/textures/ground/02.png");
   this.load.image("ground3", "./assets/textures/ground/03.jpg");

   // Effects
   this.load.image("cannonShot", "./assets/textures/effects/cannon.gif");
   this.load.image("fireball", "./assets/textures/effects/fireball.gif");
   this.load.image("cannonImpact", "./assets/textures/effects/impact.gif");

   // Sprites
   //  Cannon
   this.load.image("cannonBarrel", "./assets/sprites/cannon/CannonBarrel.png");
   this.load.image("cannonBase", "./assets/sprites/cannon/CannonBase.png");

   // Enemies
   this.load.image("enemy1", "./assets/sprites/enemies/1.png");
   this.load.image("enemy2", "./assets/sprites/enemies/2.png");
   this.load.image("enemy3", "./assets/sprites/enemies/3.png");

   // Players
   this.load.image("player1", "./assets/sprites/players/1.png");
   this.load.image("player2", "./assets/sprites/players/1.1.png"); // Damaged state
   this.load.image("player3", "./assets/sprites/players/2.png");
   this.load.image("player4", "./assets/sprites/players/3.png");

   // Structures (all facing vertically upwards) (Images from 1 - 4 are the stages of the structure, healthy, lightly damaged, moderately damaged, heavily damaged)
   // Circles
   this.load.image("circle1", "./assets/sprites/structures/circle/1.png");
   this.load.image("circle2", "./assets/sprites/structures/circle/2.png");
   this.load.image("circle3", "./assets/sprites/structures/circle/3.png");
   this.load.image("circle4", "./assets/sprites/structures/circle/4.png");

   // Rectangles
   this.load.image("rectangle1", "./assets/sprites/structures/rectangle/1.png");
   this.load.image("rectangle2", "./assets/sprites/structures/rectangle/2.png");
   this.load.image("rectangle3", "./assets/sprites/structures/rectangle/3.png");
   this.load.image("rectangle4", "./assets/sprites/structures/rectangle/4.png");

   // Squares
   this.load.image("square1", "./assets/sprites/structures/square/1.png");
   this.load.image("square2", "./assets/sprites/structures/square/2.png");
   this.load.image("square3", "./assets/sprites/structures/square/3.png");
   this.load.image("square4", "./assets/sprites/structures/square/4.png");

   // Triangles
   this.load.image("triangle1", "./assets/sprites/structures/triangle/1.png");
   this.load.image("triangle2", "./assets/sprites/structures/triangle/2.png");
   this.load.image("triangle3", "./assets/sprites/structures/triangle/3.png");
   this.load.image("triangle4", "./assets/sprites/structures/triangle/4.png");

   // Audio files
   // Player sounds
   this.load.audio("playerDeath", "./assets/audio/character/destroyed.mp3");
   this.load.audio("playerFlying", "./assets/audio/character/flying.mp3");
   this.load.audio("playerImpact1", "./assets/audio/character/impact_1.mp3");
   this.load.audio("playerImpact2", "./assets/audio/character/impact_2.mp3");

   // Enemy sounds
   this.load.audio("enemyDeath", "./assets/audio/enemy/destroyed.mp3");
   this.load.audio("enemyDamage1", "./assets/audio/enemy/1_damage.mp3");
   this.load.audio("enemyDamage2", "./assets/audio/enemy/2_damage.mp3");
   this.load.audio("taunt", "./assets/audio/enemy/taunt.mp3");

   // Effects
   this.load.audio("bounce", "./assets/audio/effects/bounce.mp3");
   this.load.audio("cannonShot", "./assets/audio/effects/explosion.mp3");
   this.load.audio("woodDamage", "./assets/audio/effects/wood_damage.mp3");
   this.load.audio(
     "woodDestroyed",
     "./assets/audio/effects/wood_destroyed.mp3"
   );

   // Game sounds
   this.load.audio("theme", "./assets/audio/game/theme.mp3");
   this.load.audio("menuTheme", "./assets/audio/game/MenuIntro.mp3");
    this.load.audio("gameOver", "./assets/audio/game/lose.mp3");
    this.load.audio("gameWin", "./assets/audio/game/win.mp3");
    this.load.audio("gameStart", "./assets/audio/game/round_begin.mp3");
    this.load.audio("ambience", "./assets/audio/game/background_loop.mp3");
  }

  // Create function to set up the game scene
  create() {
    // Start the MenuScene
    this.scene.start("MenuScene");
  }
}
