let Enemy = require('./enemy');

let PIXI = require('pixi.js');

describe('Enemy', function () {
    let enemy;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
        enemy = new Enemy({stage: stage});
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Enemy(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(enemy).toBeDefined();
    });
});
