let _ = require('lodash');
let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');

function Enemy({stage, x, y} = {}) {
    this.speed = CONSTS.GAME.ENEMY.SPEED;
    this.sprite = new PIXI.Sprite(textures.enemy);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.stage = stage;
    this.stage.addChild(this.sprite);
}
_.extend(Enemy.prototype, {
    getHitboxCoordinates: function () {
        return {
            x1: this.sprite.x + this.hitbox.x[0],
            x2: this.sprite.x + this.hitbox.x[1],
            y1: this.sprite.y + this.hitbox.y[0],
            y2: this.sprite.y + this.hitbox.y[1],
        }
    },
    getX: function () {
        return this.sprite.x;
    },
    getY: function () {
        return this.sprite.y;
    },
    hitbox: {
        x: [-3, 3],
        y: [-3, 3],
    },
    id: null,
    move: function () {
        this.sprite.x -= this.speed;
    },
    remove: function () {
        this.stage.removeChild(this.sprite);
        this.collection.remove(this);
    },
    removeIfDead: function () {
        if (this.sprite.x < 0) {
            this.remove();
        }
    },
});
module.exports = Enemy;
