let Enemy = require('./shooting-enemy');

let PIXI = require('pixi.js');

describe('ShootingEnemy', function () {
    let enemy;
    let stage;
    let game;

    beforeEach(function () {
        stage = new PIXI.Container();
        game = {
            fireEnemyBullet: jasmine.createSpy('fireEnemyBullet'),
        };
        enemy = new Enemy({
            stage: stage,
            game: game,
        });
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Enemy({game: game}); }).toThrow();
    });

    it('should throw an Error if instantiated without a game', function () {
        expect(function () { new Enemy({stage: stage}); }).toThrow();
    });

    it('should instantiate', function () {
        expect(enemy).toBeDefined();
    });

    describe('when moving', function () {
        let spriteX, spriteY;

        beforeEach(function () {
            spriteX = enemy.sprite.x;
            spriteY = enemy.sprite.y;
            enemy.move();
        });

        it('should change the sprite\'s x or y position', function () {
            expect(
                (enemy.sprite.x !== spriteX) || (enemy.sprite.y !== spriteY)
            ).toBe(true);
        });
    });

    describe('when shooting', function () {
        beforeEach(function () {
            enemy.shoot();
        });

        it('should call fireEnemyBullet', function () {
            expect(game.fireEnemyBullet).toHaveBeenCalled();
        });
    });
});
