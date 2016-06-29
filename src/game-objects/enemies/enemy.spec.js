let Enemy = require('./enemy');

let PIXI = require('pixi.js');

describe('Enemy', function () {
    let enemy;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
        enemy = new Enemy({stage: stage});
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Enemy(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(enemy).toBeDefined();
    });

    describe('when moving', function () {
        let spriteX, spriteY;

        beforeEach(function () {
            enemy.sprite.x = 100;
            enemy.sprite.y = 100;
            spriteX = enemy.sprite.x;
            spriteY = enemy.sprite.y;
            enemy.move();
        });

        it('should change the sprite\'s x or y position', function () {
            expect(
                (enemy.sprite.x !== spriteX) || (enemy.sprite.y !== spriteY)
            ).toBe(true);
        });

        describe('when off-screen', function () {
            beforeEach(function () {
                enemy.sprite.y = -10000;
                spyOn(enemy, 'remove');
                enemy.move();
            });

            it('should be removed', function () {
                expect(enemy.remove).toHaveBeenCalled();
            });
        });
    });
});
