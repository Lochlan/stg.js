let PIXI = require('pixi.js');

let CONSTS = require('../consts');
let textures = require('../textures');

class GameObject {
    constructor({stage, x, y} = {}, textureName) {
        if (!stage) {
            throw new Error('stage required');
        }

        this.createSprite(textureName, stage, x, y);

        this.hasAppearedOnScreen = false;
    }

    collidesWith(gameObject) {
        let hitbox = this.getHitboxCoordinates();
        let gameObjectHitbox = gameObject.getHitboxCoordinates();
        if (hitbox.x2 >= gameObjectHitbox.x1) {
            if (hitbox.x1 <= gameObjectHitbox.x2) {
                if (hitbox.y2 >= gameObjectHitbox.y1) {
                    if (hitbox.y1 <= gameObjectHitbox.y2) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    createSprite(textureName, stage, x=0, y=0) {
        this.sprite = new PIXI.Sprite(textures[textureName]);
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 0.5;
        this.sprite.x = x;
        this.sprite.y = y;
        this.stage = stage;
        this.stage.addChild(this.sprite);
    }

    getHitboxCoordinates() {
        return {
            x1: this.x + this.hitbox.x[0],
            x2: this.x + this.hitbox.x[1],
            y1: this.y + this.hitbox.y[0],
            y2: this.y + this.hitbox.y[1],
        };
    }

    isOffScreen() {
        return this.x < 0 - CONSTS.GAME.SCREEN.PADDING
            || this.x > CONSTS.GAME.SCREEN.WIDTH + CONSTS.GAME.SCREEN.PADDING
            || this.y < 0  - CONSTS.GAME.SCREEN.PADDING
            || this.y > CONSTS.GAME.SCREEN.HEIGHT + CONSTS.GAME.SCREEN.PADDING;
    }

    isOnScreen() {
        return this.x > 0
            && this.x < CONSTS.GAME.SCREEN.WIDTH
            && this.y > 0
            && this.y < CONSTS.GAME.SCREEN.HEIGHT;
    }

    move() {
        if (!this.hasAppearedOnScreen && this.isOnScreen()) {
            this.hasAppearedOnScreen = true;
        }
    }

    remove() {
        this.stage.removeChild(this.sprite);
        if (this.collection) {
            this.collection.remove(this);
        }
    }

    removeIfDead() {
        if (this.isOffScreen() && this.hasAppearedOnScreen) {
            this.remove();
        }
    }

    get alpha() {
        return this.sprite.alpha;
    }

    set alpha(alpha) {
        return this.sprite.alpha = alpha;
    }

    get x() {
        return this.sprite.x;
    }

    set x(x) {
        return this.sprite.x = x;
    }

    get y() {
        return this.sprite.y;
    }

    set y(y) {
        return this.sprite.y = y;
    }
}
module.exports = GameObject;
