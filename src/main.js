'use strict';

var CONSTS = {
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

function Collection() {
    this.data = {};
}
_.extend(Collection.prototype, {
    add: function (item) {
        item.id = this.nextId;
        item.collection = this;
        this.data[this.nextId] = item;
        this.nextId++;
    },
    data: null,
    each: function (callback) {
        return _.each(this.data, callback);
    },
    nextId: 0,
    remove: function (item) {
        delete this.data[item.id];
    },
});

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

var textures = {
    bullet: PIXI.Texture.fromImage('assets/bullet.png'),
    enemy: PIXI.Texture.fromImage('assets/target.png'),
    ship: PIXI.Texture.fromImage('assets/ship.png'),
};

function Ship() {
    this.sprite = new PIXI.Sprite(textures.ship);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = 200;
    this.sprite.position.y = 150;
    stage.addChild(this.sprite);
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

function Bullet(x, y) {
    this.speed = CONSTS.GAME.BULLET.SPEED
    this.sprite = new PIXI.Sprite(textures.bullet);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    stage.addChild(this.sprite);
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
        stage.removeChild(this.sprite);
        this.collection.remove(this);
    },
    removeIfDead: function (index) {
        if (this.sprite.x > CONSTS.GAME.SCREEN.WIDTH) {
            this.remove();
        }
    },
});

function fireBullet() {
    state.bullets.add(
        new Bullet(ship.getX(), ship.getY())
    );
    state.input.shoot = false;
}

function moveBullets() {
    state.bullets.each(function (bullet) {
        bullet.move();
        bullet.removeIfDead();
    });
}

function Enemy(x, y) {
    this.speed = CONSTS.GAME.ENEMY.SPEED;
    this.sprite = new PIXI.Sprite(textures.enemy);
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = x;
    this.sprite.position.y = y;
    stage.addChild(this.sprite);
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
        stage.removeChild(this.sprite);
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

var ship = new Ship();

state.enemies.add(new Enemy(450, 150));

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
        fireBullet();
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
