let Ship = require('./ship');

let PIXI = require('pixi.js');
let Enemy = require('./enemy');

describe('Ship', function () {
    let ship;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
        ship = new Ship({stage: stage});
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Ship(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(ship).toBeDefined();
    });

    describe('when moving down', function () {
        let spriteY;

        beforeEach(function () {
            spriteY = ship.sprite.y;
            ship.moveDown();
        });

        it('should increase the value of sprite.y', function () {
            expect(ship.sprite.y).toBeGreaterThan(spriteY);
        });
    });

    describe('when moving up', function () {
        let spriteY;

        beforeEach(function () {
            spriteY = ship.sprite.y;
            ship.moveUp();
        });

        it('should decrease the value of sprite.y', function () {
            expect(ship.sprite.y).toBeLessThan(spriteY);
        });
    });

    describe('when moving left', function () {
        let spriteX;

        beforeEach(function () {
            spriteX = ship.sprite.x;
            ship.moveLeft();
        });

        it('should decrease the value of sprite.x', function () {
            expect(ship.sprite.x).toBeLessThan(spriteX);
        });
    });

    describe('when moving right', function () {
        let spriteX;

        beforeEach(function () {
            spriteX = ship.sprite.x;
            ship.moveRight();
        });

        it('should increase the value of sprite.x', function () {
            expect(ship.sprite.x).toBeGreaterThan(spriteX);
        });
    });

    describe('when not occupying the same space as another game object', function () {
        let enemy;

        beforeEach(function () {
            enemy = new Enemy({
                stage: stage,
                x: ship.getX() + 1000, // arbitrary non-colliding distance, far away
                y: ship.getY(),
            });
        });

        afterEach(function () {
            enemy.remove();
        });

        it('is not considered to have collided with that object', function () {
            expect(ship.collidesWith(enemy)).toEqual(false);
        });
    });

    describe('when occupying the same space as another game object', function () {
        let enemy;

        beforeEach(function () {
            enemy = new Enemy({
                stage: stage,
                x: ship.getX(),
                y: ship.getY(),
            });
        });

        afterEach(function () {
            enemy.remove();
        });

        it('is considered to have collided with that object', function () {
            expect(ship.collidesWith(enemy)).toEqual(true);
        });
    });
});
