let ShootingEnemy = require('./shooting-enemy');
let EnemyBullet = require('../enemy-bullet');

class BigWheel extends ShootingEnemy {
    constructor({game} = {}, textureName = 'bigWheel') {
        super(arguments[0], textureName);
        if (!game) {
            throw new Error('game required');
        }
        this.hitbox = {
            x: [-14, 14],
            y: [-14, 14],
        };
        this.moves = [].concat(
            {x: -1, y: 0, action: 'shoot'},
            Array(10).fill({x: -1, y: 0})
        );
        this.moveIndex = 0;

        this.bulletSpeed = 3;
        this.game = game;
    }

    move() {
        super.move();

        if (this.moves[this.moveIndex].action === 'shoot') {
            this.shoot();
        }

        this.rotation += 0.1;
    }
}
module.exports = BigWheel;
