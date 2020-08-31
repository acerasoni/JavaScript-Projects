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
    this.terrain = new Array();

    for (var i = 0; i < 28; i++) {
        for (var k = 0; k < 14; k++) {
            this.terrain.push(new dirt(50 * i, 50 * k));
        }
    }
    // Day/night cycle 

    // Temperature

    this.rabbit = new rabbit(200, 200);
    this.wolf = new wolf(600, 600);
}

function draw() {
    background(220);

    stroke('white')

    // Draw grid
    grid.forEach(l => l.draw());

    // Draw terrain
    this.terrain.forEach(t => t.draw());

    fill('black')

    // Draw rabbit
    this.rabbit.draw();
    this.wolf.draw();

    // Move
    this.rabbit.moveLeft();
}