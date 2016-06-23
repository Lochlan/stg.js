let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');
let GameObject = require('./game-object');

class EnemyBullet extends GameObject {
    constructor({stage, x, y, moves=[{x: -1, y: -1}]} = {}) {
        super(...arguments);
        this.hitbox = {
            x: [-2, 2],
            y: [-2, 2],
        };
        this.moves = moves;
        this.moveIndex = 0;
        this.speed = CONSTS.GAME.BULLET.SPEED;
        this.sprite = new PIXI.Sprite(textures.enemyBullet);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    move() {
        this.sprite.x += this.moves[this.moveIndex].x;
        this.sprite.y += this.moves[this.moveIndex].y;
        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }

    removeIfDead() {
        if (this.sprite.x < 0 || this.sprite.x > CONSTS.GAME.SCREEN.WIDTH) {
            this.remove();
        }
    }
}
module.exports = EnemyBullet;
