let CONSTS = require('../consts');
let GameObject = require('./game-object');

class Bullet extends GameObject {
    constructor(options) {
        super(options, 'bullet');
        this.hitbox = {
            x: [-2, 2],
            y: [-2, 2],
        };
        this.speed = CONSTS.GAME.BULLET.SPEED;
    }

    move() {
        super.move();
        this.sprite.x += this.speed;
        this.removeIfDead();
    }
}
module.exports = Bullet;
