CONSTS = {
    GAME: {
        BULLET: {
            SPEED: 10,
        },
        ENEMY: {
            SPEED: 1,
        },
        SCREEN: {
            HEIGHT: 300,
            WIDTH: 400,
        },
        SHIP: {
            SPEED: 3,
        },
    },
    KEYS: {
        SPACE_BAR: 32,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
    }
};

state = {
    input: {
        left: false,
        up: false,
        right: false,
        down: false,
        shoot: false,
    }
}

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(CONSTS.GAME.SCREEN.WIDTH, CONSTS.GAME.SCREEN.HEIGHT, {
    backgroundColor: 0x000000
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var shipTexture = PIXI.Texture.fromImage('assets/ship.png');
var ship = new PIXI.Sprite(shipTexture);
ship.anchor.x = 0.5;
ship.anchor.y = 0.5;
ship.position.x = 200;
ship.position.y = 150;

stage.addChild(ship);

var bulletTexture = PIXI.Texture.fromImage('assets/bullet.png');

bullets = [];

function fireBullet() {
    var bullet = new PIXI.Sprite(bulletTexture);
    bullet.anchor.x = 0.5;
    bullet.anchor.y = 0.5;
    bullet.position.x = ship.position.x;
    bullet.position.y = ship.position.y;
    stage.addChild(bullet);

    bullets.push(bullet)

    state.input.shoot = false;
}

function moveBullets() {
    bullets.forEach(function (bullet) {
        bullet.x += CONSTS.GAME.BULLET.SPEED;
    });

    bullets.forEach(function (bullet, index) {
        if (bullet.x > CONSTS.GAME.SCREEN.WIDTH) {
            stage.removeChild(bullet);
            bullets.splice(index, 1);
        }
    });
}

var enemyTexture = PIXI.Texture.fromImage('assets/target.png');

enemies = [];

var enemy = new PIXI.Sprite(enemyTexture);
enemy.anchor.x = 0.5;
enemy.anchor.y = 0.5;
enemy.position.x = 450;
enemy.position.y = 150;
stage.addChild(enemy);

enemies.push(enemy)

function moveEnemies() {
    enemies.forEach(function (enemy) {
        enemy.x -= CONSTS.GAME.ENEMY.SPEED;
    });

    enemies.forEach(function (enemy, index) {
        if (enemy.x < 0) {
            stage.removeChild(enemy);
            enemies.splice(index, 1);
        }
    });
}

function animate() {
    requestAnimationFrame(animate);

    moveBullets();
    moveEnemies();

    if (state.input.left) {
        ship.x -= CONSTS.GAME.SHIP.SPEED;
    }
    if (state.input.up) {
        ship.y -= CONSTS.GAME.SHIP.SPEED;
    }
    if (state.input.right) {
        ship.x += CONSTS.GAME.SHIP.SPEED;
    }
    if (state.input.down) {
        ship.y += CONSTS.GAME.SHIP.SPEED;
    }

    if (state.input.shoot) {
        fireBullet();
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
