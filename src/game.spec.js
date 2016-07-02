let Game = require('./game');

let Enemy = require('./game-objects/enemies/enemy');
let GameObjects = require('./game-objects/game-objects');

describe('Game', function () {
    let game;

    beforeEach(function () {
        game = new Game({eventQueue: []});
    });

    it('should throw an Error if instantiated without any options', function () {
        expect(function () { new Game(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(game).toBeDefined();
    });

    describe('when advancing the frame', function () {
        it('should not throw an error', function () {
            expect(game.advanceFrame.bind(game)).not.toThrow();
        });

        describe('when there is no ship', function () {
            beforeEach(function () {
                delete game.ship;
            });

            it('should not throw an error', function () {
                expect(game.advanceFrame.bind(game)).not.toThrow();
            });
        });
    });

    describe('when checking for collisions', function () {
        describe('when the ship and an enemy are colliding', function () {
            let enemy;

            beforeEach(function () {
                enemy = game.createEnemy(
                    new Enemy({
                        stage: game.stage,
                        x: game.ship.x,
                        y: game.ship.y,
                    })
                );
                spyOn(enemy, 'remove');
            });

            it('should remove the enemy', function () {
                game.checkForCollisions();
                expect(enemy.remove).toHaveBeenCalled();
            });

            describe('when the ship collision is not handled', function () {
                beforeEach(function () {
                    spyOn(game, 'handleShipCollision').and.returnValue(false);
                });

                it('should not remove the enemy', function () {
                    game.checkForCollisions();
                    expect(enemy.remove).not.toHaveBeenCalled();
                });
            });
        });

        describe('when the ship and an enemy bullet are colliding', function () {
            let enemyBullet;

            beforeEach(function () {
                enemyBullet = game.fireEnemyBullet(
                    new Enemy({
                        stage: game.stage,
                        x: game.ship.x,
                        y: game.ship.y,
                    })
                );
                spyOn(enemyBullet, 'remove');
            });

            it('should remove the enemy bullet', function () {
                game.checkForCollisions();
                expect(enemyBullet.remove).toHaveBeenCalled();
            });

            describe('when the ship collision is not handled', function () {
                beforeEach(function () {
                    spyOn(game, 'handleShipCollision').and.returnValue(false);
                });

                it('should not remove the enemy bullet', function () {
                    game.checkForCollisions();
                    expect(enemyBullet.remove).not.toHaveBeenCalled();
                });
            });
        });

        describe('when a bullet and an enemy are colliding', function () {
            let bullet;
            let enemy;

            beforeEach(function () {
                bullet = game.fireBullet(); // created at ship's position
                spyOn(bullet, 'remove');

                enemy = game.createEnemy(
                    new Enemy({
                        stage: game.stage,
                        x: game.ship.x,
                        y: game.ship.y,
                    })
                );
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

        describe('when there is no ship', function () {
            let enemy;

            beforeEach(function () {
                delete game.ship;
            });

            it('should not throw an error', function () {
                expect(game.checkForCollisions.bind(game)).not.toThrow();
            });
        });
    });

    describe('when creating an enemy', function () {
        let enemy;

        beforeEach(function () {
            enemy = game.createEnemy({x: 100, y: 100});
        });

        it('should add the enemy to the game state', function () {
            expect(game.state.enemies.data[0]).toEqual(enemy);
        })
    });

    describe('when firing a bullet', function () {
        let bullet;

        beforeEach(function () {
            bullet = game.fireBullet();
        });

        it('should add a bullet to the game state', function () {
            expect(game.state.bullets.data[0]).toEqual(bullet);
        });
    });

    describe('when firing an enemy bullet', function () {
        let bullet;

        beforeEach(function () {
            bullet = game.fireEnemyBullet(
                // "bullet" can safely be any game object
                new Enemy({stage: game.stage, x: 100, y: 100})
            );
        });

        it('should add an enemy to the game state', function () {
            expect(game.state.enemyBullets.data[0]).toEqual(bullet);
        });
    });

    describe('when there is a game over', function () {
        beforeEach(function () {
            spyOn(game, 'removeInputListeners').and.callThrough();
            game.gameOver();
        });

        it('should remove event listeners', function () {
            expect(game.removeInputListeners).toHaveBeenCalled();
        });
    });

    describe('when getting the ship', function () {
        let ship;

        beforeEach(function () {
            ship = game.getShip();
        });

        it('should return the game state\'s ship', function () {
            expect(ship).toEqual(game.ship);
        });
    });

    describe('when handling a ship collision', function () {
        describe('when there is no ship', function () {
            beforeEach(function () {
                delete game.ship;
            });

            it('should return false', function () {
                expect(game.handleShipCollision()).toEqual(false);
            });
        });

        describe('when the ship is invincible', function () {
            beforeEach(function () {
                spyOn(game.ship, 'isInvincible').and.returnValue(true);
            });

            it('should return false', function () {
                expect(game.handleShipCollision()).toEqual(false);
            });
        });

        describe('when there are extra lives', function () {
            beforeEach(function () {
                game.state.player.lives = 2;
                spyOn(game, 'createShip').and.callThrough();
                game.handleShipCollision();
            });

            it('should create a new ship', function () {
                expect(game.createShip).toHaveBeenCalled();
            });
        });

        describe('when there are no extra lives', function () {
            beforeEach(function () {
                game.state.player.lives = 1;
                spyOn(game, 'gameOver').and.callThrough();
                game.handleShipCollision();
            });

            it('should game over', function () {
                expect(game.gameOver).toHaveBeenCalled();
            });
        });
    });

    describe('when processing the event queue', function () {
        describe('when there is an event to process', function () {
            let processedEvent;

            beforeEach(function () {
                processedEvent = {
                    time: 0,
                    procedure: jasmine.createSpy('procedure'),
                };
                game.eventQueue = [processedEvent];
                game.processEventQueue();
            });

            it('should invoke the "procedure" method on the dequeued event', function () {
                expect(processedEvent.procedure).toHaveBeenCalled();
            });
        });

        describe('when it is empty', function () {
            let processedEvent;

            beforeEach(function () {
                game.eventQueue = [];
            });

            it('should not throw an error', function () {
                expect(game.processEventQueue.bind(game)).not.toThrow();
            });
        });
    });

    describe('when rendering', function () {
        beforeEach(function () {
            spyOn(game.renderer, 'render');
            game.render();
        });

        it('should invoke the "render" method on the game renderer', function () {
            expect(game.renderer.render).toHaveBeenCalledWith(game.stage);
        });
    });
});
