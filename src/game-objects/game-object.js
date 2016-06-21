class GameObject {
    constructor({stage} = {}) {
        if (!stage) {
            throw new Error('stage required');
        }
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

    move() {
    }

    remove() {
        this.stage.removeChild(this.sprite);
        if (this.collection) {
            this.collection.remove(this);
        }
    }
}
module.exports = GameObject;
