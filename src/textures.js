let PIXI = require('pixi.js');

let textures = {
    bigWheel: PIXI.Texture.fromImage('assets/big-disc-enemy.png'),
    bullet: PIXI.Texture.fromImage('assets/bullet.png'),
    enemy: PIXI.Texture.fromImage('assets/target.png'),
    enemyBullet: PIXI.Texture.fromImage('assets/enemy-bullet.png'),
    ship: PIXI.Texture.fromImage('assets/ship.png'),
    shootingEnemy: PIXI.Texture.fromImage('assets/shooting-enemy.png'),
};
module.exports = textures;
