let Enemy = require('./enemy');
let EnemyBullet = require('../enemy-bullet');

class ShootingEnemy extends Enemy {
    constructor({game} = {}, textureName = 'shootingEnemy') {
        super(arguments[0], textureName);
        if (!game) {
            throw new Error('game required');
        }
        this.hitbox = {
            x: [-8, 8],
            y: [-8, 8],
        };
        this.moves = [].concat(
            Array(90).fill({x: -2, y: 0}),
            {x: 0, y: 0, action: 'shoot'},
            Array(30).fill({x: 0, y: 0})
        );
        this.moveIndex = 0;

        this.bulletSpeed = 3;
        this.game = game;
    }

    fireBullet(moves) {
        this.game.fireEnemyBullet(
            new EnemyBullet({
                stage: this.stage,
                x: this.x,
                y: this.y,
                moves: moves,
            })
        );
    }

    getAngleWithGameObject(gameObject) {
        if (!gameObject) return;

        return Math.atan2(
            this.y - gameObject.y,
            this.x - gameObject.x
        );
    }

    move() {
        super.move();

        if (this.moves[this.moveIndex].action === 'shoot') {
            this.shoot3Way();
        }
    }

    shoot() {
        const angleWithShip = this.getAngleWithGameObject(this.game.getShip());

        const x = -Math.cos(angleWithShip) * this.bulletSpeed;
        const y = -Math.sin(angleWithShip) * this.bulletSpeed;

        this.fireBullet([{x: x, y: y}]);
    }

    shoot3Way() {
        const ship = this.game.getShip();
        if (!ship) return;
        const angleWithShip = this.getAngleWithGameObject(ship);

        this.fireBullet([{
            x: -Math.cos(angleWithShip - 0.2) * this.bulletSpeed,
            y: -Math.sin(angleWithShip - 0.2) * this.bulletSpeed,
        }]);

        this.fireBullet([{
            x: -Math.cos(angleWithShip) * this.bulletSpeed,
            y: -Math.sin(angleWithShip) * this.bulletSpeed,
        }]);

        this.fireBullet([{
            x: -Math.cos(angleWithShip + 0.2) * this.bulletSpeed,
            y: -Math.sin(angleWithShip + 0.2) * this.bulletSpeed,
        }]);
    }
}
module.exports = ShootingEnemy;
