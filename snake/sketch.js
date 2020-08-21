let timer = 0;

function setup() {
    createCanvas(400, 400);
    fill('red');
    stroke('red')
    this.grid = new Array();
    for (i = 0; i <= 400; i++) {
        if (i % 20 == 0) {
            this.grid.push(new straightLine(0, i, 400, i));
            this.grid.push(new straightLine(i, 0, i, 400));
        }
    }
    this.f = new fruit();
    this.snake = new snake();
    this.snake.addBodyPart();
    // this.snake.addBodyPart(1);
    // 0 = UP, 1 = DOWN, 2 = LEFT, 3 = RIGHT
    this.dir = 0;
}

function draw() {
    // Read command
    if (keyIsDown(UP_ARROW)) {
        this.dir = 0;
    } else if (keyIsDown(DOWN_ARROW)) {
        this.dir = 1;
    } else if (keyIsDown(LEFT_ARROW)) {
        this.dir = 2;
    } else if (keyIsDown(RIGHT_ARROW)) {
        this.dir = 3;
    }

    // Set background
    background(400);

    // Draw grid
    grid.forEach(l => l.draw());

    // Draw fruit
    this.f.draw();

    // Draw player
    this.snake.draw();

    // Update player pos
    if (millis() >= 500 + timer) {
        switch (this.dir) {
            case 0:
                this.snake.moveVertically(-20);
                break;
            case 1:
                this.snake.moveVertically(20);
                break;
            case 2:
                this.snake.moveHorizontally(-20);
                break;
            case 3:
                this.snake.moveHorizontally(20);
                break;

        }
        timer = millis();
    }

    // Check for lose

    //if (this.snake.x >= 400 || this.snake.x <= 0 || this.snake.y <= 0 || this.snake.y >= 400) {
    //  background(400);
    // }


}