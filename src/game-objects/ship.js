let CONSTS = require('../consts');
let GameObject = require('./game-object');

class Ship extends GameObject {
    constructor({game} = {}) {
        super(arguments[0], 'ship');
        if (!game) {
            throw new Error('game required');
        }
        this.hitbox = {
            x: [-5, 5],
            y: [-3, 3],
        };
        this.game = game;
        this.moves = [];

        this.enqueueEnteringScreenMoves();
    }

    decrementInvincibilityTimer() {
        this.invincibilityTimer--;
        if (this.invincibilityTimer <= 0) {
            this.disableInvincibility();
        }
    }

    dequeuePredeterminedMove() {
        let move = this.moves.shift()
        this.x += move.x;
        this.y += move.y;
    }

    disableInvincibility() {
        this.invincibilityTimer = 0;
        this.alpha = 1;
    }

    enableInvincibility() {
        this.invincibilityTimer = 120;
        this.alpha = 0.5;
    }

    enqueueEnteringScreenMoves() {
        this.x = -20;
        this.y = parseInt(CONSTS.GAME.SCREEN.HEIGHT / 2, 10);
        this.moves = Array(20).fill({x: 3, y: 0});
    }

    hasPredeterminedMoves() {
        return this.moves.length > 0;
    }

    isInvincible() {
        return this.invincibilityTimer > 0;
    }

    move(inputState) {
        if (this.hasPredeterminedMoves()) {
            this.dequeuePredeterminedMove();
            return;
        }

        if (this.isInvincible()) {
            this.decrementInvincibilityTimer();
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
        if (this.y < CONSTS.GAME.SCREEN.HEIGHT) {
            this.y += CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveLeft() {
        if (this.x > 0) {
            this.x -= CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveRight() {
        if (this.x < CONSTS.GAME.SCREEN.WIDTH) {
            this.x += CONSTS.GAME.SHIP.SPEED;
        }
    }

    moveUp() {
        if (this.y > 0) {
            this.y -= CONSTS.GAME.SHIP.SPEED;
        }
    }
}
module.exports = Ship;
