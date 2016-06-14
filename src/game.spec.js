let Game = require('./game');

let GameObjects = require('./game-objects/game-objects');

describe('Game', function () {
    let game;

    beforeEach(function () {
        game = new Game();
    });

    it('should instantiate', function () {
        expect(game).toBeDefined();
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
