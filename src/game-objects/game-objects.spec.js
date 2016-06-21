let GameObjects = require('./game-objects');

let PIXI = require('pixi.js');
let Enemy = require('./enemies/enemy');

describe('GameObjects', function () {
    let collection;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
        collection = new GameObjects(
            new Enemy({stage: stage, x: 100, y: 100}),
            new Enemy({stage: stage, x: 200, y: 200}),
            new Enemy({stage: stage, x: 300, y: 300})
        );
    });

    describe('when checking if colliding with another game object', function () {
        let callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');
        });

        describe('when they collide', function () {
            beforeEach(function () {
                collection.ifCollidingWith(new Enemy({stage: stage, x: 200, y: 200}), callback);
            });

            it('should invoke the callback', function () {
                expect(callback).toHaveBeenCalled();
            });
        });

        describe('when they don\'t collide', function () {
            beforeEach(function () {
                collection.ifCollidingWith(new Enemy({stage: stage, x: 400, y: 400}), callback);
            });

            it('should not invoke the callback', function () {
                expect(callback).not.toHaveBeenCalled();
            });
        });
    });

    describe('when checking if colliding with another collection of game objects', function () {
        let callback;

        beforeEach(function () {
            callback = jasmine.createSpy('callback');
        });

        describe('when at least one collides', function () {
            beforeEach(function () {
                let otherCollection = new GameObjects(
                    new Enemy({stage: stage, x: 100, y: 100}),
                    new Enemy({stage: stage, x: 200, y: 100}),
                    new Enemy({stage: stage, x: 300, y: 100})
                );
                collection.ifCollidingWithCollection(otherCollection, callback);
            });

            it('should invoke the callback', function () {
                expect(callback).toHaveBeenCalled();
            });
        });

        describe('when they don\'t collide', function () {
            beforeEach(function () {
                let otherCollection = new GameObjects(
                    new Enemy({stage: stage, x: 100, y: 200}),
                    new Enemy({stage: stage, x: 200, y: 300}),
                    new Enemy({stage: stage, x: 300, y: 400})
                );
                collection.ifCollidingWithCollection(otherCollection, callback);
            });

            it('should not invoke the callback', function () {
                expect(callback).not.toHaveBeenCalled();
            });
        });
    });

    describe('when moving', function () {
        beforeEach(function () {
            collection.each(function (gameObject) {
                spyOn(gameObject, 'move');
            });
            collection.move();
        });

        it('should invoke the "move" method on each game object', function () {
            collection.each(function (gameObject) {
                expect(gameObject.move).toHaveBeenCalled();
            });
        });
    });
});
