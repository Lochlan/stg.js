CONSTS = {
    GAME: {
        SHIP: {
            SPEED: 3,
        },
    },
    KEYS: {
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
    }
}

var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(400, 300, {
    backgroundColor: 0x000000
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var texture = PIXI.Texture.fromImage('assets/ship.png');
var ship = new PIXI.Sprite(texture);

ship.anchor.x = 0.5;
ship.anchor.y = 0.5;

ship.position.x = 200;
ship.position.y = 150;

stage.addChild(ship);

function animate() {
    requestAnimationFrame(animate);

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
    }
});
