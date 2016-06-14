let PIXI = require('pixi.js');

let GameObjects = require('./game-objects/game-objects');
let CONSTS = require('./consts');
let Bullet = require('./game-objects/bullet');
let Enemy = require('./game-objects/enemy');
let Ship = require('./game-objects/ship');


let eventQueue = [
    {
        time: 0,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 200,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 400,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 600,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 800,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 1000,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
];

class Game {
    constructor() {
        this.state = {
            bullets: new GameObjects(),
            enemies: new GameObjects(),
            input: {
                left: false,
                up: false,
                right: false,
                down: false,
                shoot: false,
            },
            startTime: new Date().getTime(),
        };

        this.stage = new PIXI.Container();
        this.renderer = PIXI.autoDetectRenderer(CONSTS.GAME.SCREEN.WIDTH, CONSTS.GAME.SCREEN.HEIGHT, {
            backgroundColor: 0x000000
        });
        this.ship = new Ship({stage: this.stage});
        this.eventQueue = eventQueue;

        document.body.appendChild(this.renderer.view);

        this.addInputListeners();
    }

    addInputListeners() {
        document.addEventListener('keydown', function (event) {
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
        }.bind(this));

        document.addEventListener('keyup', function (event) {
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
        }.bind(this));
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.moveGameObjects(this.state.bullets);
        this.moveGameObjects(this.state.enemies);
        this.handleInput();
        this.checkForCollisions();
        this.processEventQueue();
        this.render();
    }

    checkForCollisions() {
        this.state.bullets.ifCollidingWithCollection(
            this.state.enemies,
            function (bullet, enemy) {
                bullet.remove();
                enemy.remove();
            }
        );

        this.state.enemies.ifCollidingWith(this.ship, function (enemy) {
            enemy.remove();
            console.log('ship hit');
        });
    }

    createEnemy({x, y} = {}) {
        let enemy = new Enemy({stage: this.stage, x: x, y: y});
        this.state.enemies.add(enemy);
        return enemy;
    }

    fireBullet() {
        let bullet = new Bullet({
            stage: this.stage,
            x: this.ship.getX(),
            y: this.ship.getY()
        });
        this.state.bullets.add(bullet);
        return bullet;
    }

    handleInput() {
        if (this.state.input.left) {
            this.ship.moveLeft();
        }
        if (this.state.input.up) {
            this.ship.moveUp();
        }
        if (this.state.input.right) {
            this.ship.moveRight();
        }
        if (this.state.input.down) {
            this.ship.moveDown();
        }

        if (this.state.input.shoot) {
            this.fireBullet();
            this.state.input.shoot = false;
        }
    }

    moveGameObjects(gameObjects) {
        gameObjects.each(function (gameObject) {
            gameObject.move();
        });
    }

    processEventQueue() {
        let currentTime = new Date().getTime() - this.state.startTime;
        while (this.eventQueue.length > 0 && currentTime > this.eventQueue[0].time) {
            let currentEvent = this.eventQueue.shift();
            currentEvent.procedure.apply(this);
        }
    }

    render() {
        this.renderer.render(this.stage);
    }
}

module.exports = Game;
