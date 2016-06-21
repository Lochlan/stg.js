let Enemy = require('./game-objects/enemies/enemy');
let ShootingEnemy = require('./game-objects/enemies/shooting-enemy');

let eventQueue = [
    {
        time: 0,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
    {
        time: 100,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 450, y: 50}));
        }
    },
    {
        time: 100,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 450, y: 250}));
        }
    },
    {
        time: 200,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
    {
        time: 400,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
    {
        time: 600,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
    {
        time: 800,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
    {
        time: 1000,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 450, y: 150}));
        }
    },
];
module.exports = eventQueue;
