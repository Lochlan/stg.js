let PIXI = require('pixi.js');
let textures = require('../../textures');
let Enemy = require('./enemy');

class ShootingEnemy extends Enemy {
    constructor({stage, x, y} = {}) {
        super(...arguments);
        this.hitbox = {
            x: [-8, 8],
            y: [-8, 8],
        };
        this.moves = [
            {x: -1, y: 0},
        ];
        this.moveIndex = 0;

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
        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }

    removeIfDead() {
        if (this.sprite.x < 0) {
            this.remove();
        }
    }
}
module.exports = ShootingEnemy;
