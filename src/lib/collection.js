let _ = require('lodash');

class Collection {
    constructor() {
        this.data = {};
        this.nextId = 0;
    }

    add(...items) {
        items.forEach((item) => {
            item.id = this.nextId;
            item.collection = this;
            this.data[this.nextId] = item;
            this.nextId++;
        });
    }

    each(callback) {
        return _.each(this.data, callback);
    }

    remove(item) {
        delete this.data[item.id];
    }
}

module.exports = Collection;
