let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');
let GameObject = require('./game-object');

class Ship extends GameObject {
    constructor({stage, x=200, y=150} = {}) {
        super();
        this.hitbox = {
            x: [-5, 5],
            y: [-3, 3],
        };

        this.sprite = new PIXI.Sprite(textures.ship);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    moveDown() {
        this.sprite.y += CONSTS.GAME.SHIP.SPEED;
    }

    moveLeft() {
        this.sprite.x -= CONSTS.GAME.SHIP.SPEED;
    }

    moveRight() {
        this.sprite.x += CONSTS.GAME.SHIP.SPEED;
    }

    moveUp() {
        this.sprite.y -= CONSTS.GAME.SHIP.SPEED;
    }
}
module.exports = Ship;
