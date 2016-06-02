let _ = require('lodash');
let PIXI = require('pixi.js');

let Collection = require('./lib/collection');
let CONSTS = require('./consts');
let textures = require('./textures');

var state = {
    bullets: new Collection(),
    enemies: new Collection(),
    input: {
        left: false,
        up: false,
        right: false,
        down: false,
        shoot: false,
    }
};

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

function Bullet({stage, x, y} = {}) {
    this.speed = CONSTS.GAME.BULLET.SPEED
    this.sprite = new PIXI.Sprite(textures.bullet);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    this.stage = stage; 
    this.stage.addChild(this.sprite);
}
_.extend(Bullet.prototype, {
    getHitboxCoordinates: function () {
        return {
            x1: this.sprite.x + this.hitbox.x[0],
            x2: this.sprite.x + this.hitbox.x[1],
            y1: this.sprite.y + this.hitbox.y[0],
            y2: this.sprite.y + this.hitbox.y[1],
        }
    },
    hitbox: {
        x: [-2, 2],
        y: [-2, 2],
    },
    id: null,
    move: function () {
        this.sprite.x += this.speed;
    },
    remove: function () {
        this.stage.removeChild(this.sprite);
        this.collection.remove(this);
    },
    removeIfDead: function (index) {
        if (this.sprite.x > CONSTS.GAME.SCREEN.WIDTH) {
            this.remove();
        }
    },
});

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

function moveEnemies() {
    state.enemies.each(function (enemy) {
        enemy.move();
        enemy.removeIfDead();
    });
}

function checkForCollisions() {
    state.bullets.each(function (bullet) {
        state.enemies.each(function (enemy) {
            var bulletHitbox = bullet.getHitboxCoordinates();
            var enemyHitbox = enemy.getHitboxCoordinates();

            if (bulletHitbox.x2 >= enemyHitbox.x1) {
                if (bulletHitbox.x1 <= enemyHitbox.x2) {

                    if (bulletHitbox.y2 >= enemyHitbox.y1) {
                        if (bulletHitbox.y1 <= enemyHitbox.y2) {
                            enemy.remove();
                            bullet.remove();
                        }
                    }
                }
            }
        });
    });
}

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(CONSTS.GAME.SCREEN.WIDTH, CONSTS.GAME.SCREEN.HEIGHT, {
    backgroundColor: 0x000000
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var ship = new Ship({stage: stage});

state.enemies.add(
    new Enemy({
        stage: stage,
        x: 450,
        y: 150,
    })
);

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
