let Enemy = require('./game-objects/enemies/enemy');
let ShootingEnemy = require('./game-objects/enemies/shooting-enemy');

let eventQueue = [
    {
        time: 200,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 400,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 600,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 800,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 1000,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 1200,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        time: 1500,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 300, y: 40, game: this}));
        }
    },
    {
        time: 1500,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 300, y: 184, game: this}));
        }
    },
];
module.exports = eventQueue;
