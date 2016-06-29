let ShootingEnemy = require('./shooting-enemy');

let PIXI = require('pixi.js');
let Enemy = require('./enemy');

describe('ShootingEnemy', function () {
    let enemy;
    let stage;
    let game;

    beforeEach(function () {
        stage = new PIXI.Container();
        let shipDouble = new Enemy({stage: stage});
        game = {
            fireEnemyBullet: jasmine.createSpy('fireEnemyBullet'),
            getShip: () => shipDouble,
        };
        enemy = new ShootingEnemy({
            stage: stage,
            game: game,
        });
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new ShootingEnemy({game: game}); }).toThrow();
    });

    it('should throw an Error if instantiated without a game', function () {
        expect(function () { new ShootingEnemy({stage: stage}); }).toThrow();
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
                enemy.sprite.y = 10000;
                spyOn(enemy, 'remove');
                enemy.move();
            });

            it('should be removed', function () {
                expect(enemy.remove).toHaveBeenCalled();
            });
        });
    });

    describe('when shooting', function () {
        beforeEach(function () {
            let ship = game.getShip();
            ship.sprite.x = 100;
            ship.sprite.y = 100;
            enemy.sprite.x = 0;
            enemy.sprite.y = 0;
            enemy.shoot();
        });

        it('should call fireEnemyBullet', function () {
            expect(game.fireEnemyBullet).toHaveBeenCalled();
        });

        it('should fire the bullet at the player\'s ship', function () {
            let firedBullet = game.fireEnemyBullet.calls.mostRecent().args[0];
            expect(firedBullet.moves[0].x).toEqual(2.1213203435596424);
            expect(firedBullet.moves[0].y).toEqual(2.121320343559643);
        });
    });
});
