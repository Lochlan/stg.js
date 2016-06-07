let Collection = require('./collection');

describe('Collection', function () {
    let collection;

    beforeEach(function () {
        collection = new Collection();
    });

    describe('when instantiating without items', function () {
        it('should instantiate', function () {
            expect(collection).toBeDefined();
        });

        it('should have an empty data object', function () {
            expect(collection.data).toEqual({});
        });
    });

    describe('when instantiating with items', function () {
        let foo, bar, baz;

        beforeEach(function () {
            foo = {name: 'foo'};
            bar = {name: 'bar'};
            baz = {name: 'baz'};
            collection = new Collection(foo, bar, baz);
        });

        it('should instantiate', function () {
            expect(collection).toBeDefined();
        });

        it('should have those items in its data object', function () {
            expect(collection.data[foo.id]).toEqual(foo);
            expect(collection.data[bar.id]).toEqual(bar);
            expect(collection.data[baz.id]).toEqual(baz);
        });
    });

    describe('when adding an item', function () {
        let item;

        beforeEach(function () {
            item = {name: 'foo'};
            collection.add(item);
        });

        it('places the item in its data object', function () {
            expect(collection.data[item.id]).toEqual(item);
        });
    });

    describe('when removing an item', function () {
        let item;

        beforeEach(function () {
            item = {name: 'foo'};
            collection.add(item);
            collection.remove(item);
        });

        it('places the item in its data object', function () {
            expect(collection.data[item.id]).toBeUndefined();

        });
    });
});
