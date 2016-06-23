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
        this.sprite.x += this.moves[this.moveIndex].x;
        this.sprite.y += this.moves[this.moveIndex].y;

        if (this.moves[this.moveIndex].action === 'shoot') {
            this.shoot();
        }

        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }

    removeIfDead() {
        if (this.sprite.x < 0) {
            this.remove();
        }
    }

    shoot() {
        this.game.fireEnemyBullet(
            new EnemyBullet({
                stage: this.stage,
                x: this.getX(),
                y: this.getY(),
                moves: [{x: -1, y: -1}],
            })
        );
    }
}
module.exports = ShootingEnemy;
