let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');
let GameObject = require('./game-object');

class Bullet extends GameObject {
    constructor({stage, x, y} = {}) {
        super(...arguments);
        this.hitbox = {
            x: [-2, 2],
            y: [-2, 2],
        };
        this.speed = CONSTS.GAME.BULLET.SPEED;
        this.sprite = new PIXI.Sprite(textures.bullet);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    move() {
        this.sprite.x += this.speed;
        this.removeIfDead();
    }

    removeIfDead() {
        if (this.sprite.x > CONSTS.GAME.SCREEN.WIDTH) {
            this.remove();
        }
    }
}
module.exports = Bullet;
