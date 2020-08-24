const SCREEN_WIDTH_HEIGHT = 1400;

function setup() {
    createCanvas(SCREEN_WIDTH_HEIGHT, SCREEN_WIDTH_HEIGHT);

    this.graphOne = new graph(10, SCREEN_WIDTH_HEIGHT / 3, 15, 30);
    this.graphTwo = new graph(SCREEN_WIDTH_HEIGHT / 3 + 20, (SCREEN_WIDTH_HEIGHT / 3 * 2) - 10, SCREEN_WIDTH_HEIGHT / 3 + 25, 30);
    this.tensorProduct = new tensorProduct(SCREEN_WIDTH_HEIGHT / 3 * 2 + 20, SCREEN_WIDTH_HEIGHT - 10, graphOne, graphTwo, SCREEN_WIDTH_HEIGHT / 3 * 2 + 25, 30);
}

function draw() {
    background(220);

    // Draw dividers
    stroke('red');
    strokeWeight(2);
    line(SCREEN_WIDTH_HEIGHT / 3 + 10, 0, SCREEN_WIDTH_HEIGHT / 3 + 10, SCREEN_WIDTH_HEIGHT);
    line((SCREEN_WIDTH_HEIGHT / 3 * 2) + 10, 0, (SCREEN_WIDTH_HEIGHT / 3 * 2) + 10, SCREEN_WIDTH_HEIGHT);
    stroke('black');
    strokeWeight(1);

    graphOne.draw();
    graphTwo.draw();
    this.tensorProduct.draw();
}