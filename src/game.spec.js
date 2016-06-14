let Game = require('./game');

let Enemy = require('./game-objects/enemy');
let GameObjects = require('./game-objects/game-objects');

describe('Game', function () {
    let game;

    beforeEach(function () {
        game = new Game();
    });

    it('should instantiate', function () {
        expect(game).toBeDefined();
    });

    describe('when checking for collisions', function () {
        describe('when the ship and an enemy are colliding', function () {
            let enemy;

            beforeEach(function () {
                enemy = new Enemy({
                    stage: game.stage,
                    x: game.ship.getX(),
                    y: game.ship.getY(),
                });
                spyOn(enemy, 'remove');
                game.state.enemies.add(enemy);
                game.checkForCollisions();
            });

            it('should remove the enemy', function () {
                expect(enemy.remove).toHaveBeenCalled();
            });
        });

        describe('when a bullet and an enemy are colliding', function () {
            let bullet;
            let enemy;

            beforeEach(function () {
                game.fireBullet(); // created at ship's position
                bullet = game.state.bullets.data[0];
                spyOn(bullet, 'remove');

                enemy = new Enemy({
                    stage: game.stage,
                    x: game.ship.getX(),
                    y: game.ship.getY(),
                });
                game.state.enemies.add(enemy);
                spyOn(enemy, 'remove');

                // move ship out of the way
                game.ship.sprite.x += 100;
                game.ship.sprite.y += 100;

                game.checkForCollisions();
            });

            it('should remove the bullet and enemy', function () {
                expect(bullet.remove).toHaveBeenCalled();
                expect(enemy.remove).toHaveBeenCalled();
            });
        });
    });

    describe('when firing a bullet', function () {
        beforeEach(function () {
            game.fireBullet();
        });

        it('should add a bullet to the game state', function () {
            expect(game.state.bullets.data[0]).toBeDefined();
        });
    });

    describe('when moving game objects', function () {
        let spies;

        beforeEach(function () {
            spies = [];
            let gameObjects = new GameObjects();
            for (let i=0; i<3; i++) {
                let spy = jasmine.createSpy();
                gameObjects.add({move: spy});
                spies.push(spy);
            }
            game.moveGameObjects(gameObjects);
        });

        it('should invoke the "move" method on each game object', function () {
            spies.forEach(function (spy) {
                expect(spy).toHaveBeenCalled();
            });
        });
    });
});
