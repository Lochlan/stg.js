let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let textures = require('../textures');
let GameObject = require('./game-object');

class Ship extends GameObject {
    constructor({stage, x=40, y=150, game} = {}) {
        super(...arguments);
        if (!game) {
            throw new Error('game required');
        }
        this.hitbox = {
            x: [-5, 5],
            y: [-3, 3],
        };

        this.game = game;
        this.moves = [];
        this.sprite = new PIXI.Sprite(textures.ship);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);

        this.enqueueEnteringScreenMoves();
    }


    dequeuePredeterminedMove() {
        let move = this.moves.shift()
        this.sprite.x += move.x;
        this.sprite.y += move.y;
    }

    enqueueEnteringScreenMoves() {
        this.sprite.position.x = -20;
        this.sprite.position.y = parseInt(CONSTS.GAME.SCREEN.HEIGHT / 2, 10);
        this.moves = Array(20).fill({x: 3, y: 0});
    }

    hasPredeterminedMoves() {
        return this.moves.length > 0;
    }

    move(inputState) {
        if (this.hasPredeterminedMoves()) {
            this.dequeuePredeterminedMove();
            return;
        }

        if (inputState.left) {
            this.moveLeft();
        }
        if (inputState.up) {
            this.moveUp();
        }
        if (inputState.right) {
            this.moveRight();
        }
        if (inputState.down) {
            this.moveDown();
        }

        if (inputState.shoot) {
            this.game.fireBullet();
            inputState.shoot = false;
        }
    }

    moveDown() {
        if (this.sprite.y < CONSTS.GAME.SCREEN.HEIGHT) {
            this.sprite.y += CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveLeft() {
        if (this.sprite.x > 0) {
            this.sprite.x -= CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveRight() {
        if (this.sprite.x < CONSTS.GAME.SCREEN.WIDTH) {
            this.sprite.x += CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveUp() {
        if (this.sprite.y > 0) {
            this.sprite.y -= CONSTS.GAME.SHIP.SPEED;
        }
    }
}
module.exports = Ship;
