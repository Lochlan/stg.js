let Bullet = require('./bullet');

let PIXI = require('pixi.js');

describe('Bullet', function () {
    let bullet;
    let stage;

    beforeEach(function () {
        stage = new PIXI.Container();
        bullet = new Bullet({stage: stage});
    });

    it('should throw an Error if instantiated without a stage', function () {
        expect(function () { new Bullet(); }).toThrow();
    });

    it('should instantiate', function () {
        expect(bullet).toBeDefined();
    });
});
