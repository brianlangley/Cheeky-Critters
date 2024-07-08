import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.setScale(0.5);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(false);
  }

  update() {
    // Check if the enemy is below the ground
    if (this.y > this.scene.ground.y) {
      this.damage();
    }

    // Check if the enemy has left the edge of the map
    if (this.x < 0 || this.x > this.scene.sys.game.config.width) {
      this.damage();
    }
  }

  // Destroy the enemy and play the death sound
  damage() {
    this.scene.sound.play("enemyDeath");
    let points = 100;
    if (this.texture.key === "enemy2") points = 200;
    if (this.texture.key === "enemy3") points = 300;
    this.scene.scoring.addScore(points);
    this.destroy();
  }

  // Randomly select an enemy type
  getRandomEnemyType(enemyTypes) {
    const rand = Math.random();
    if (rand < 0.6) return enemyTypes[0];
    if (rand < 0.9) return enemyTypes[1];
    return enemyTypes[2];
  }

  // Get a random position to spawn an enemy
  getEnemySpawnPosition(structures, ground, existingSpawns) {
    let position;
    let attempts = 0;
    const maxAttempts = 100;
    const minDistance = 100;

    do {
      const structure = Phaser.Utils.Array.GetRandom(structures.getChildren());
      const spawnOnStructure = Math.random() < 0.7;

      if (spawnOnStructure && structure) {
        position = {
          x: structure.x + Phaser.Math.Between(-50, 50),
          y: structure.y - structure.height / 2,
        };
      } else {
        position = {
          x: Phaser.Math.Between(structure.x - 100, structure.x + 100),
          y: ground.y - 50,
        };
      }
      attempts++;
    } while (
      existingSpawns.some(
        (spawn) =>
          Phaser.Math.Distance.Between(
            spawn.x,
            spawn.y,
            position.x,
            position.y
          ) < minDistance
      ) &&
      attempts < maxAttempts
    );

    return position;
  }
  
  // Spawn a group of enemies
  spawn(scene, structures, ground) {
    const enemyTypes = ["enemy1", "enemy2", "enemy3"];
    const enemyCount = Phaser.Math.Between(2, 4);
    const enemies = scene.physics.add.group();
    const existingSpawns = [];

    for (let i = 0; i < enemyCount; i++) {
      const enemyType = this.getRandomEnemyType(enemyTypes);
      const spawnPosition = this.getEnemySpawnPosition(
        structures,
        ground,
        existingSpawns
      );

      const enemy = new Enemy(
        scene,
        spawnPosition.x,
        spawnPosition.y,
        enemyType
      );
      enemies.add(enemy);
      existingSpawns.push(spawnPosition);

      scene.physics.add.collider(enemy, ground, null, function () {
        return enemy.y <= ground.y;
      });
      scene.physics.add.collider(enemy, structures);
    }

    return enemies;
  }
}
