let CONSTS = require('../consts');

class GameObject {
    constructor({stage} = {}) {
        if (!stage) {
            throw new Error('stage required');
        }

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

    getHitboxCoordinates() {
        return {
            x1: this.sprite.x + this.hitbox.x[0],
            x2: this.sprite.x + this.hitbox.x[1],
            y1: this.sprite.y + this.hitbox.y[0],
            y2: this.sprite.y + this.hitbox.y[1],
        };
    }

    getX() {
        return this.sprite.x;
    }

    getY() {
        return this.sprite.y;
    }

    isOffScreen() {
        return this.sprite.x < 0 - CONSTS.GAME.SCREEN.PADDING
            || this.sprite.x > CONSTS.GAME.SCREEN.WIDTH + CONSTS.GAME.SCREEN.PADDING
            || this.sprite.y < 0  - CONSTS.GAME.SCREEN.PADDING
            || this.sprite.y > CONSTS.GAME.SCREEN.HEIGHT + CONSTS.GAME.SCREEN.PADDING;
    }

    isOnScreen() {
        return this.sprite.x > 0
            && this.sprite.x < CONSTS.GAME.SCREEN.WIDTH
            && this.sprite.y > 0
            && this.sprite.y < CONSTS.GAME.SCREEN.HEIGHT;
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
}
module.exports = GameObject;
