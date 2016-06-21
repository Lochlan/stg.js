let Game = require('./game');

let GameObjects = require('./game-objects/game-objects');

describe('Game', function () {
    let game;

    beforeEach(function () {
        game = new Game({eventQueue: []});
    });

    it('should instantiate', function () {
        expect(game).toBeDefined();
    });

    describe('when checking for collisions', function () {
        describe('when the ship and an enemy are colliding', function () {
            let enemy;

            beforeEach(function () {
                enemy = game.createEnemy({x: game.ship.getX(), y: game.ship.getY()});
                spyOn(enemy, 'remove');
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
                bullet = game.fireBullet(); // created at ship's position
                spyOn(bullet, 'remove');

                enemy = game.createEnemy({x: game.ship.getX(), y: game.ship.getY()});
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

    describe('when handling input', function () {
        describe('when left input is active', function () {
            beforeEach(function () {
                game.state.input.left = true;
                spyOn(game.ship, 'moveLeft');
                game.handleInput();
            });

            it('should move the ship left', function () {
                expect(game.ship.moveLeft).toHaveBeenCalled();
            });
        });

        describe('when up input is active', function () {
            beforeEach(function () {
                game.state.input.up = true;
                spyOn(game.ship, 'moveUp');
                game.handleInput();
            });

            it('should move the ship up', function () {
                expect(game.ship.moveUp).toHaveBeenCalled();
            });
        });

        describe('when right input is active', function () {
            beforeEach(function () {
                game.state.input.right = true;
                spyOn(game.ship, 'moveRight');
                game.handleInput();
            });

            it('should move the ship right', function () {
                expect(game.ship.moveRight).toHaveBeenCalled();
            });
        });

        describe('when down input is active', function () {
            beforeEach(function () {
                game.state.input.down = true;
                spyOn(game.ship, 'moveDown');
                game.handleInput();
            });

            it('should move the ship down', function () {
                expect(game.ship.moveDown).toHaveBeenCalled();
            });
        });

        describe('when shoot input is active', function () {
            beforeEach(function () {
                game.state.input.shoot = true;
                spyOn(game, 'fireBullet');
                game.handleInput();
            });

            it('should fire a bullet', function () {
                expect(game.fireBullet).toHaveBeenCalled();
            });

            it('should set shoot input to inactive', function () {
                expect(game.state.input.shoot).toEqual(false);
            });
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
