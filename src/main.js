let Game = require('./game');
let eventQueue = require('./event-queue');

let game = new Game({eventQueue: eventQueue});
game.animate();
