let PIXI = require('pixi.js');
let textures = require('../../textures');
let Enemy = require('./enemy');
let EnemyBullet = require('../enemy-bullet');

class ShootingEnemy extends Enemy {
    constructor({stage, x, y, game} = {}) {
        super(...arguments);
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
        this.sprite = new PIXI.Sprite(textures.shootingEnemy);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    move() {
        super.move();

        if (this.moves[this.moveIndex].action === 'shoot') {
            this.shoot();
        }
    }

    shoot() {
        let ship = this.game.getShip();
        const angleWithShip = Math.atan2(
            this.y - ship.y,
            this.x - ship.x
        );

        const x = -Math.cos(angleWithShip) * this.bulletSpeed;
        const y = -Math.sin(angleWithShip) * this.bulletSpeed;

        this.game.fireEnemyBullet(
            new EnemyBullet({
                stage: this.stage,
                x: this.x,
                y: this.y,
                moves: [{x: x, y: y}],
            })
        );
    }
}
module.exports = ShootingEnemy;
