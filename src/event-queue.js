let eventQueue = [
    {
        time: 0,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 200,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 400,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 600,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 800,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
    {
        time: 1000,
        procedure() {
            this.createEnemy({x: 450, y: 150});
        }
    },
];
module.exports = eventQueue;
