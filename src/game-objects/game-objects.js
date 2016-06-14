let Collection = require('../lib/collection');

class GameObjects extends Collection {
    constructor(...items) {
        super(...arguments);
    }

    ifCollidingWith(otherGameObject, callback) {
        this.each(function (gameObject) {
            if (gameObject.collidesWith(otherGameObject)) {
                callback(gameObject, otherGameObject)
            }
        });
    }

    ifCollidingWithCollection(otherCollection, callback) {
        otherCollection.each(function (otherGameObject) {
            this.ifCollidingWith(otherGameObject, callback);
        }.bind(this));
    }
}
module.exports = GameObjects;
