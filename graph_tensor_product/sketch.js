const SCREEN_WIDTH = 1920;
const SCREEN_HEIGHT = 1080;

function setup() {
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);

    this.graphOne = new graph(8, 5, 10, SCREEN_WIDTH / 3, 15, 30);
    this.graphTwo = new graph(4, 3, SCREEN_WIDTH / 3 + 20, (SCREEN_WIDTH / 3 * 2) - 10, SCREEN_WIDTH / 3 + 25, 30);
    this.tensorProduct = new tensorProduct(SCREEN_WIDTH / 3 * 2 + 20, SCREEN_WIDTH - 10, graphOne, graphTwo, SCREEN_WIDTH / 3 * 2 + 25, 30);
}

function draw() {
    background(220);

    // Draw dividers
    stroke('red');
    strokeWeight(2);
    line(SCREEN_WIDTH / 3 + 10, 0, SCREEN_WIDTH / 3 + 10, SCREEN_HEIGHT);
    line((SCREEN_WIDTH / 3 * 2) + 10, 0, (SCREEN_WIDTH / 3 * 2) + 10, SCREEN_HEIGHT);
    stroke('black');
    strokeWeight(1);

    graphOne.draw();
    graphTwo.draw();
    this.tensorProduct.draw();
}