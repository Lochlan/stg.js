let EnemyBullet = require('./enemy-bullet');

let PIXI = require('pixi.js');

describe('EnemyBullet', function () {
    let bullet;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
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
            spriteX = bullet.sprite.x;
            spriteY = bullet.sprite.y;
            bullet.move();
        });

        it('should change the sprite\'s x or y position', function () {
            expect(
                (bullet.sprite.x !== spriteX) || (bullet.sprite.y !== spriteY)
            ).toBe(true);
        });
    });
});