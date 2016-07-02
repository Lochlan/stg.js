let Ship = require('./ship');

let _ = require('lodash');
let PIXI = require('pixi.js');
let CONSTS = require('../consts');
let Enemy = require('./enemies/enemy');

describe('Ship', function () {
    let ship;
    let stage;
    let game;

    beforeEach(function () {
        game = {
            fireBullet: jasmine.createSpy('fireBullet'),
        };
        stage = new PIXI.Container();
        ship = new Ship({stage: stage, game: game});
    });

    it('should throw an Error if instantiated without any options', function () {
        expect(function () { new Ship(); }).toThrow();
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Ship({game: game}); }).toThrow();
    });

    it('should throw an Error if instantiated without a game', function () {
        expect(function () { new Ship({stage: stage}); }).toThrow();
    });

    it('should instantiate', function () {
        expect(ship).toBeDefined();
    });

    describe('when moving', function () {
        let defaultInput = Object.freeze({
            left: false,
            up: false,
            right: false,
            down: false,
            shoot: false,
        });

        describe('when there are enqueued predetermined moves', function () {
            describe('when left input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveLeft');
                    ship.move(_.defaults({left: true}, defaultInput));
                });

                it('should move left', function () {
                    expect(ship.moveLeft).not.toHaveBeenCalled();
                });
            });

            describe('when up input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveUp');
                    ship.move(_.defaults({up: true}, defaultInput));
                });

                it('should move up', function () {
                    expect(ship.moveUp).not.toHaveBeenCalled();
                });
            });

            describe('when right input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveRight');
                    ship.move(_.defaults({right: true}, defaultInput));
                });

                it('should move right', function () {
                    expect(ship.moveRight).not.toHaveBeenCalled();
                });
            });

            describe('when down input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveDown');
                    ship.move(_.defaults({down: true}, defaultInput));
                });

                it('should move down', function () {
                    expect(ship.moveDown).not.toHaveBeenCalled();
                });
            });

            describe('when shoot input is active', function () {
                beforeEach(function () {
                    ship.move(_.defaults({shoot: true}, defaultInput));
                });

                it('should fire a bullet', function () {
                    expect(game.fireBullet).not.toHaveBeenCalled();
                });
            });
        });

        describe('when positioned centrally with no enqueued predetermined moves', function () {
            beforeEach(function () {
                // enable input-driven movement: remove predetermined moves and place ship within screen
                // (ship normally starts off-screen with a queued animation)
                ship.moves = [];
                ship.sprite.x = 100;
                ship.sprite.y = 100;
            });

            describe('when left input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveLeft');
                    ship.move(_.defaults({left: true}, defaultInput));
                });

                it('should move left', function () {
                    expect(ship.moveLeft).toHaveBeenCalled();
                });
            });

            describe('when up input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveUp');
                    ship.move(_.defaults({up: true}, defaultInput));
                });

                it('should move up', function () {
                    expect(ship.moveUp).toHaveBeenCalled();
                });
            });

            describe('when right input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveRight');
                    ship.move(_.defaults({right: true}, defaultInput));
                });

                it('should move right', function () {
                    expect(ship.moveRight).toHaveBeenCalled();
                });
            });

            describe('when down input is active', function () {
                beforeEach(function () {
                    spyOn(ship, 'moveDown');
                    ship.move(_.defaults({down: true}, defaultInput));
                });

                it('should move down', function () {
                    expect(ship.moveDown).toHaveBeenCalled();
                });
            });

            describe('when shoot input is active', function () {
                beforeEach(function () {
                    ship.move(_.defaults({shoot: true}, defaultInput));
                });

                it('should fire a bullet', function () {
                    expect(game.fireBullet).toHaveBeenCalled();
                });
            });
        });
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

        describe('when at the bottom of the screen', function () {
            beforeEach(function () {
                ship.sprite.y = CONSTS.GAME.SCREEN.HEIGHT
                spriteY = ship.sprite.y;
                ship.moveDown();
            });

            it('should not increase the value of sprite.y', function () {
                expect(ship.sprite.y).toEqual(spriteY);
            });
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

        describe('when at the top of the screen', function () {
            beforeEach(function () {
                ship.sprite.y = 0
                spriteY = ship.sprite.y;
                ship.moveUp();
            });

            it('should not decrease the value of sprite.y', function () {
                expect(ship.sprite.y).toEqual(spriteY);
            });
        });
    });

    describe('when moving left', function () {
        let spriteX;

        beforeEach(function () {
            // since ship normally starts off-screen, move to the middle so we can move left
            ship.sprite.x = 100;
            spriteX = ship.sprite.x;
            ship.moveLeft();
        });

        it('should decrease the value of sprite.x', function () {
            expect(ship.sprite.x).toBeLessThan(spriteX);
        });

        describe('when at the left side of the screen', function () {
            beforeEach(function () {
                ship.sprite.x = 0
                spriteX = ship.sprite.x;
                ship.moveLeft();
            });

            it('should not decrease the value of sprite.x', function () {
                expect(ship.sprite.x).toEqual(spriteX);
            });
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

        describe('when at the right side of the screen', function () {
            beforeEach(function () {
                ship.sprite.x = CONSTS.GAME.SCREEN.WIDTH
                spriteX = ship.sprite.x;
                ship.moveRight();
            });

            it('should not increase the value of sprite.x', function () {
                expect(ship.sprite.x).toEqual(spriteX);
            });
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
