let Enemy = require('./game-objects/enemies/enemy');
let ShootingEnemy = require('./game-objects/enemies/shooting-enemy');

let eventQueue = [
    {
        frame: 60,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 70,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 80,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 90,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 100,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 110,
        procedure() {
            this.createEnemy(new Enemy({stage: this.stage, x: 300, y: 112}));
        }
    },
    {
        frame: 150,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 300, y: 40, game: this}));
        }
    },
    {
        frame: 150,
        procedure() {
            this.createEnemy(new ShootingEnemy({stage: this.stage, x: 300, y: 184, game: this}));
        }
    },
];
module.exports = eventQueue;
