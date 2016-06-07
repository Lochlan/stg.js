let Game = require('./game');

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
});
