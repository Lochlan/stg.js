let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');

class Ship {
    constructor({stage, x=200, y=150} = {}) {
        this.sprite = new PIXI.Sprite(textures.ship);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    getX() {
        return this.sprite.x;
    }

    getY() {
        return this.sprite.y;
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
