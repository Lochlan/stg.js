let GameObject = require('../game-object');

class Enemy extends GameObject {
    constructor(options, textureName = 'enemy') {
        super(options, textureName);
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
    }

    move() {
        super.move();
        this.x += this.moves[this.moveIndex].x;
        this.y += this.moves[this.moveIndex].y * 8;
        this.moveIndex = (this.moveIndex + 1) % this.moves.length;
        this.removeIfDead();
    }
}
module.exports = Enemy;
