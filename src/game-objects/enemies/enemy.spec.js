let Enemy = require('./enemy');

describe('Enemy', function () {
    let enemy;
    let stage;

    beforeEach(function () {
        stage = {
            addChild: jasmine.createSpy('addChild'),
            removeChild: jasmine.createSpy('removeChild'),
        };
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
            enemy.x = 100;
            enemy.y = 100;
            spriteX = enemy.x;
            spriteY = enemy.y;
            enemy.move();
        });

        it('should change the sprite\'s x or y position', function () {
            expect(
                (enemy.x !== spriteX) || (enemy.y !== spriteY)
            ).toBe(true);
        });

        describe('when off-screen', function () {
            beforeEach(function () {
                enemy.y = -10000;
                spyOn(enemy, 'remove');
                enemy.move();
            });

            it('should be removed', function () {
                expect(enemy.remove).toHaveBeenCalled();
            });
        });
    });
});
