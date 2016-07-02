let PIXI = require('pixi.js');

let GameObjects = require('./game-objects/game-objects');
let CONSTS = require('./consts');
let Bullet = require('./game-objects/bullet');
let Ship = require('./game-objects/ship');

class Game {
    constructor({eventQueue} = {}) {
        this.state = {
            bullets: new GameObjects(),
            enemies: new GameObjects(),
            enemyBullets: new GameObjects(),
            input: {
                left: false,
                up: false,
                right: false,
                down: false,
                shoot: false,
            },
            player: {
                lives: 3,
            },
            startTime: new Date().getTime(),
        };
        this.eventQueue = eventQueue.slice(); // don't modify original

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(CONSTS.GAME.SCREEN.WIDTH, CONSTS.GAME.SCREEN.HEIGHT, {
            backgroundColor: 0x000000
        });
        document.body.appendChild(this.renderer.view);

        this.setPermanentMethodBindings();
        this.addInputListeners();

        this.createLivesDisplay();
        this.createShip();
    }

    addInputListeners() {
        document.addEventListener('keydown', this.addInputListenersKeydownCallback);
        document.addEventListener('keyup', this.addInputListenersKeyupCallback);
    }

    addInputListenersKeydownCallback(event) {
        if (event.keyCode == CONSTS.KEYS.LEFT_ARROW) {
            this.state.input.left = true;
        } else if (event.keyCode == CONSTS.KEYS.UP_ARROW) {
            this.state.input.up = true;
        } else if (event.keyCode == CONSTS.KEYS.RIGHT_ARROW) {
            this.state.input.right = true;
        } else if (event.keyCode == CONSTS.KEYS.DOWN_ARROW) {
            this.state.input.down = true;
        } else if (event.keyCode == CONSTS.KEYS.SPACE_BAR) {
            this.state.input.shoot = true;
        }
    }

    addInputListenersKeyupCallback(event) {
        if (event.keyCode == CONSTS.KEYS.LEFT_ARROW) {
            this.state.input.left = false;
        } else if (event.keyCode == CONSTS.KEYS.UP_ARROW) {
            this.state.input.up = false;
        } else if (event.keyCode == CONSTS.KEYS.RIGHT_ARROW) {
            this.state.input.right = false;
        } else if (event.keyCode == CONSTS.KEYS.DOWN_ARROW) {
            this.state.input.down = false;
        } else if (event.keyCode == CONSTS.KEYS.SPACE_BAR) {
            this.state.input.shoot = false;
        }
    }

    advanceFrame() {
        this.state.bullets.move()
        this.state.enemies.move()
        this.state.enemyBullets.move();
        if (this.ship) {
            this.ship.move(this.state.input);
        }
        this.checkForCollisions();
        this.processEventQueue();
        this.render();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.advanceFrame();
    }

    checkForCollisions() {
        this.state.bullets.ifCollidingWithCollection(
            this.state.enemies,
            function (bullet, enemy) {
                bullet.remove();
                enemy.remove();
            }
        );

        if (this.ship) {
            this.state.enemies.ifCollidingWith(this.ship, (enemy) => {
                enemy.remove();
                this.handleShipCollision();
            });
        }

        if (this.ship) {
            this.state.enemyBullets.ifCollidingWith(this.ship, (bullet) => {
                bullet.remove();
                this.handleShipCollision();
            });
        }
    }

    createEnemy(enemy) {
        this.state.enemies.add(enemy);
        return enemy;
    }

    createLivesDisplay() {
        this.livesText = new PIXI.Text(`LIVES: ${this.state.player.lives}`, {font:'10px Arial', fill:'white'});
        this.stage.addChild(this.livesText);
    }

    createShip() {
        this.ship = new Ship({stage: this.stage, game: this});
    }

    fireBullet() {
        let bullet = new Bullet({
            stage: this.stage,
            x: this.ship.x,
            y: this.ship.y,
        });
        this.state.bullets.add(bullet);
        return bullet;
    }

    fireEnemyBullet(enemyBullet) {
        this.state.enemyBullets.add(enemyBullet);
        return enemyBullet;
    }

    gameOver() {
        this.removeInputListeners();
        console.log('game over');
    }

    getShip() {
        return this.ship;
    }

    handleShipCollision() {
        // there might not be a ship if two bullets hit at once
        if (!this.ship) {
            return;
        }

        this.ship.remove();
        delete this.ship;
        this.state.player.lives -= 1;
        this.updateLivesDisplay();

        if (this.state.player.lives === 0) {
            this.gameOver();
            return;
        }

        this.createShip();
    }

    processEventQueue() {
        let currentTime = new Date().getTime() - this.state.startTime;
        while (this.eventQueue.length > 0 && currentTime >= this.eventQueue[0].time) {
            let currentEvent = this.eventQueue.shift();
            currentEvent.procedure.apply(this);
        }
    }

    removeInputListeners() {
        document.removeEventListener('keydown', this.addInputListenersKeydownCallback);
        document.removeEventListener('keyup', this.addInputListenersKeyupCallback);
    }

    setPermanentMethodBindings() {
        [
            'addInputListenersKeydownCallback',
            'addInputListenersKeyupCallback',
            'animate',
        ].forEach((methodName) => {
            this[methodName] = this[methodName].bind(this);
        });
    }

    updateLivesDisplay() {
        this.livesText.text = `LIVES: ${this.state.player.lives}`;
    }

    render() {
        this.renderer.render(this.stage);
    }
}

module.exports = Game;
