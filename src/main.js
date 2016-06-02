let PIXI = require('pixi.js');

let Collection = require('./lib/collection');
let CONSTS = require('./consts');
let Bullet = require('./game-objects/bullet');
let Enemy = require('./game-objects/enemy');
let Ship = require('./game-objects/ship');

var state = {
    bullets: new Collection(),
    enemies: new Collection(),
    input: {
        left: false,
        up: false,
        right: false,
        down: false,
        shoot: false,
    },
    startTime: new Date().getTime(),
};

function fireBullet(ship, stage) {
    state.bullets.add(
        new Bullet({
            stage: stage,
            x: ship.getX(),
            y: ship.getY()
        })
    );
    state.input.shoot = false;
}

function moveBullets() {
    state.bullets.each(function (bullet) {
        bullet.move();
        bullet.removeIfDead();
    });
}

function moveEnemies() {
    state.enemies.each(function (enemy) {
        enemy.move();
        enemy.removeIfDead();
    });
}

function checkForCollisions() {
    state.bullets.each(function (bullet) {
        state.enemies.each(function (enemy) {
            if (bullet.collidesWith(enemy)) {
                enemy.remove();
                bullet.remove();
            }
        });
    });

    state.enemies.each(function (enemy) {
        if (ship.collidesWith(enemy)) {
            enemy.remove();
            console.log('ship hit');
        }
    });
}

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(CONSTS.GAME.SCREEN.WIDTH, CONSTS.GAME.SCREEN.HEIGHT, {
    backgroundColor: 0x000000
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var ship = new Ship({stage: stage});


let eventQueue = [
    {
        time: 0,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
    {
        time: 200,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
    {
        time: 400,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
    {
        time: 600,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
    {
        time: 800,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
    {
        time: 1000,
        procedure() {
            state.enemies.add(new Enemy({stage: stage, x: 450, y: 150}));
        }
    },
];

function animate() {
    requestAnimationFrame(animate);

    moveBullets();
    moveEnemies();

    if (state.input.left) {
        ship.moveLeft();
    }
    if (state.input.up) {
        ship.moveUp();
    }
    if (state.input.right) {
        ship.moveRight();
    }
    if (state.input.down) {
        ship.moveDown();
    }

    if (state.input.shoot) {
        fireBullet(ship, stage);
    }

    checkForCollisions();

    let currentTime = new Date().getTime() - state.startTime;
    while (eventQueue.length > 0 && currentTime > eventQueue[0].time) {
        let currentEvent = eventQueue.shift();
        currentEvent.procedure();
    }

    renderer.render(stage);
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode == CONSTS.KEYS.LEFT_ARROW) {
        state.input.left = true;
    } else if (event.keyCode == CONSTS.KEYS.UP_ARROW) {
        state.input.up = true;
    } else if (event.keyCode == CONSTS.KEYS.RIGHT_ARROW) {
        state.input.right = true;
    } else if (event.keyCode == CONSTS.KEYS.DOWN_ARROW) {
        state.input.down = true;
    } else if (event.keyCode == CONSTS.KEYS.SPACE_BAR) {
        state.input.shoot = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.keyCode == CONSTS.KEYS.LEFT_ARROW) {
        state.input.left = false;
    } else if (event.keyCode == CONSTS.KEYS.UP_ARROW) {
        state.input.up = false;
    } else if (event.keyCode == CONSTS.KEYS.RIGHT_ARROW) {
        state.input.right = false;
    } else if (event.keyCode == CONSTS.KEYS.DOWN_ARROW) {
        state.input.down = false;
    } else if (event.keyCode == CONSTS.KEYS.SPACE_BAR) {
        state.input.shoot = false;
    }
});
