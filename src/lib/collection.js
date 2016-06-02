var _ = require('lodash');

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

module.exports = Collection;
