let EnemyBullet = require('./enemy-bullet');

describe('EnemyBullet', function () {
    let bullet;
    let stage;

    beforeEach(function () {
        stage = {
            addChild: jasmine.createSpy('addChild'),
            removeChild: jasmine.createSpy('removeChild'),
        };
        bullet = new EnemyBullet({stage: stage});
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new EnemyBullet(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(bullet).toBeDefined();
    });

    describe('when moving', function () {
        let spriteX, spriteY;

        beforeEach(function () {
            bullet.x = 100;
            bullet.y = 100;
            spriteX = bullet.x;
            spriteY = bullet.y;
            bullet.move();
        });

        it('should change the sprite\'s x or y position', function () {
            expect(
                (bullet.x !== spriteX) || (bullet.y !== spriteY)
            ).toBe(true);
        });

        describe('when off-screen', function () {
            beforeEach(function () {
                bullet.x = -10000;
                spyOn(bullet, 'remove');
                bullet.move();
            });

            it('should be removed', function () {
                expect(bullet.remove).toHaveBeenCalled();
            });
        });
    });
});
