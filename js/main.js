var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(400, 300, {
    backgroundColor: 0x000000
});

document.body.appendChild(renderer.view);

requestAnimationFrame(animate);

var texture = PIXI.Texture.fromImage('assets/ship.png');
var ship = new PIXI.Sprite(texture);

ship.anchor.x = 0.5;
ship.anchor.y = 0.5;

ship.position.x = 200;
ship.position.y = 150;

stage.addChild(ship);

function animate() {
    requestAnimationFrame(animate);

    renderer.render(stage);
}
