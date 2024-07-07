import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.setScale(0.5);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.body.setCollideWorldBounds(true);
  }

  damage() {
    this.scene.sound.play("enemyDeath");
    this.destroy();
  }

  getRandomEnemyType(enemyTypes) {
    const rand = Math.random();
    if (rand < 0.6) return enemyTypes[0];
    if (rand < 0.9) return enemyTypes[1];
    return enemyTypes[2];
  }

  getEnemySpawnPosition(structures, ground) {
    const structure = Phaser.Utils.Array.GetRandom(structures.getChildren());
    const spawnOnStructure = Math.random() < 0.7;

    if (spawnOnStructure && structure) {
      return {
        x: structure.x + Phaser.Math.Between(-50, 50),
        y: structure.y - structure.height / 2,
      };
    } else {
      return {
        x: Phaser.Math.Between(structure.x - 100, structure.x + 100),
        y: ground.y - 50,
      };
    }
  }

  spawn(scene, structures, ground) {
    const enemyTypes = ["enemy1", "enemy2", "enemy3"];
    const enemyCount = Phaser.Math.Between(2, 4);
    const enemies = scene.physics.add.group();

    for (let i = 0; i < enemyCount; i++) {
      const enemyType = this.getRandomEnemyType(enemyTypes);
      const spawnPosition = this.getEnemySpawnPosition(structures, ground);

      const enemy = new Enemy(
        scene,
        spawnPosition.x,
        spawnPosition.y,
        enemyType
      );
      enemies.add(enemy);

      scene.physics.add.collider(enemy, ground);
      scene.physics.add.collider(enemy, structures);
    }

    return enemies;
  }
}
