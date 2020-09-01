// Screen settings. Both must be multiples of 20
const SCREEN_WIDTH = 1400;
const SCREEN_HEIGHT = 700;
const FRAME_RATE = 2;

function setup() {
    fill('black');
    frameRate(FRAME_RATE);
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.grid = new Array();
    for (var i = 0; i <= SCREEN_WIDTH; i++) {
        if (i % 50 == 0) {
            this.grid.push(new straightLine(0, i, SCREEN_WIDTH, i));
            this.grid.push(new straightLine(i, 0, i, SCREEN_WIDTH));
        }
    }
    textSize(50);

    // Draw terrain
    terrain.map = new Array();

    for (var i = 0; i < 28; i++) {
        for (var k = 0; k < 14; k++) {
            if (i === k) {
                terrain.map.push(new water(50 * i, 50 * k));
            } else {
                terrain.map.push(new dirt(50 * i, 50 * k));
            }
        }
    }
    // Day/night cycle 

    // Temperature

    // Animals
    var pos = getValidAnimalPosition();
    this.rabbit = new rabbit(pos.x, pos.y);
    pos = getValidAnimalPosition();
    //  this.wolf = new wolf(pos.x, pos.y);
}

function draw() {
    background(220);

    stroke('white')

    // Draw grid
    grid.forEach(l => l.draw());

    // Draw terrain
    terrain.map.forEach(t => t.draw());

    fill('black')

    // Draw rabbit
    this.rabbit.draw();
    ///  this.wolf.draw();

    // Move
    this.rabbit.move("UP");
}

function getValidAnimalPosition() {
    var x, y;

    x = Math.floor(Math.random() * 1401);
    y = Math.floor(Math.random() * 701);

    // Check if they align with the grip
    while (x % 50 !== 0 || y % 50 !== 0) {
        x = Math.floor(Math.random() * 1401);
        y = Math.floor(Math.random() * 701);
    }

    // Check if position is valid;
    for (var i = 0; i < terrain.map.length; i++) {
        var current = terrain.map[i];
        if (current.x === x && current.y === y) {
            if (!(current instanceof dirt)) {
                return getValidAnimalPosition();
            } else {
                break;
            }
        }
    }

    return {
        x: x,
        y: y
    }
}