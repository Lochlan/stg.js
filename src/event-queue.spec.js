let eventQueue = require('./event-queue');
let Game = require('./game');

describe('Event queue', function () {
    describe('when processed by the game', function () {
        let game;

        beforeEach(function () {
            game = new Game({eventQueue: eventQueue});
        });

        afterEach(function () {
            game.removeEventListeners();
        });

        it('should process every event without throwing an error', function () {
            eventQueue.forEach(function (event) {
                expect(event.procedure.bind(game)).not.toThrow();
            });
        });
    });
});
