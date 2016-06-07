let PIXI = require('pixi.js');
let textures = require('../textures');
let GameObject = require('./game-object');

class Enemy extends GameObject {
    constructor({stage, x, y} = {}) {
        super(...arguments);
        this.hitbox = {
            x: [-5, 5],
            y: [-5, 5],
        };
        this.moves = [
            {x: -1, y: 1},
            {x: -1, y: 0.9807852804},
            {x: -1, y: 0.92387953251},
            {x: -1, y: 0.8314696123},
            {x: -1, y: 0.70710678118},
            {x: -1, y: 0.55557023302},
            {x: -1, y: 0.38268343236},
            {x: -1, y: 0.19509032201},
            {x: -1, y: 0},
            {x: -1, y: -0.19509032201},
            {x: -1, y: -0.38268343236},
            {x: -1, y: -0.55557023302},
            {x: -1, y: -0.70710678118},
            {x: -1, y: -0.8314696123},
            {x: -1, y: -0.92387953251},
            {x: -1, y: -0.9807852804},
            {x: -1, y: -1},
            {x: -1, y: -0.9807852804},
            {x: -1, y: -0.92387953251},
            {x: -1, y: -0.8314696123},
            {x: -1, y: -0.70710678118},
            {x: -1, y: -0.55557023302},
            {x: -1, y: -0.38268343236},
            {x: -1, y: -0.19509032201},
            {x: -1, y: 0},
            {x: -1, y: 0.19509032201},
            {x: -1, y: 0.38268343236},
            {x: -1, y: 0.55557023302},
            {x: -1, y: 0.70710678118},
            {x: -1, y: 0.8314696123},
            {x: -1, y: 0.92387953251},
            {x: -1, y: 0.9807852804},
        ];
        this.moveIndex = 0;

        this.sprite = new PIXI.Sprite(textures.enemy);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.position.x = x;
        this.sprite.position.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    move() {
        this.sprite.x += this.moves[this.moveIndex].x;
        this.sprite.y += this.moves[this.moveIndex].y * 8;
        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }

    removeIfDead() {
        if (this.sprite.x < 0) {
            this.remove();
        }
    }
}
module.exports = Enemy;
