let _ = require('lodash');
let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');

function Ship({stage, x=200, y=150} = {}) {
    this.sprite = new PIXI.Sprite(textures.ship);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.stage = stage;
    this.stage.addChild(this.sprite);
}
_.extend(Ship.prototype, {
    getX: function () {
        return this.sprite.x;
    },
    getY: function () {
        return this.sprite.y;
    },
    moveDown: function () {
        this.sprite.y += CONSTS.GAME.SHIP.SPEED;
    },
    moveLeft: function () {
        this.sprite.x -= CONSTS.GAME.SHIP.SPEED;
    },
    moveRight: function () {
        this.sprite.x += CONSTS.GAME.SHIP.SPEED;
    },
    moveUp: function () {
        this.sprite.y -= CONSTS.GAME.SHIP.SPEED;
    },
});
module.exports = Ship;
