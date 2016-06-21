let PIXI = require('pixi.js');

let textures = {
    bullet: PIXI.Texture.fromImage('assets/bullet.png'),
    enemy: PIXI.Texture.fromImage('assets/target.png'),
    ship: PIXI.Texture.fromImage('assets/ship.png'),
    shootingEnemy: PIXI.Texture.fromImage('assets/shooting-enemy.png'),
};
module.exports = textures;
