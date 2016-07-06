let CONSTS = require('../consts');
let GameObject = require('./game-object');

class EnemyBullet extends GameObject {
    constructor({moves=[{x: -1, y: -1}]} = {}) {
        super(arguments[0], 'enemyBullet');
        this.hitbox = {
            x: [-2, 2],
            y: [-2, 2],
        };
        this.moves = moves;
        this.moveIndex = 0;
        this.speed = CONSTS.GAME.BULLET.SPEED;
    }

    move() {
        super.move();
        this.x += this.moves[this.moveIndex].x;
        this.y += this.moves[this.moveIndex].y;
        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }
}
module.exports = EnemyBullet;
