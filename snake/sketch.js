let timer = 0;
let score = 0;

function setup() {
    createCanvas(400, 400);
    background('rgb(192,192,192)');
    fill('white');
    stroke('white')
    this.grid = new Array();
    for (i = 0; i <= 400; i++) {
        if (i % 20 == 0) {
            this.grid.push(new straightLine(0, i, 400, i));
            this.grid.push(new straightLine(i, 0, i, 400));
        }
    }
    this.f = new fruit();
    this.snake = new snake();
    // this.snake.addBodyPart(1);
    // 0 = UP, 1 = DOWN, 2 = LEFT, 3 = RIGHT
    this.dir = 0;
}

function draw() {
    if (this.snake.head === this.snake.tail) {
        // Temporary positions kept only when snake is of size == 1 in order to insert second bodypart in correct position   
        var tmpX = this.snake.head.x;
        var tmpY = this.snake.head.y;
    }


    // Check which direction is blocked
    var blockedDir = this.snake.getBlockedDirection();

    // Read command
    if (keyIsDown(UP_ARROW) && blockedDir != 0) {
        this.dir = 0;
    } else if (keyIsDown(DOWN_ARROW) && blockedDir != 1) {
        this.dir = 1;
    } else if (keyIsDown(LEFT_ARROW) && blockedDir != 2) {
        this.dir = 2;
    } else if (keyIsDown(RIGHT_ARROW) && blockedDir != 3) {
        this.dir = 3;
    }

    // Set background
    background('rgb(192,192,192)');

    // Draw grid
    grid.forEach(l => l.draw());

    // Draw fruit
    this.f.draw();

    // Draw player
    this.snake.draw();

    // Draw score
    fill('black');
    stroke('black');
    text('Your score: ' + score, 5, 30);
    fill('white');
    stroke('white');

    // Update player pos
    if (millis() >= 250 + timer) {
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

    // Check collision with fruit
    if (this.snake.head.x === this.f.x && this.snake.head.y === this.f.y) {
        this.snake.addBodyPart(tmpX, tmpY, this.f.x, this.f.y);
        score += 100;
        var pos = fruit.getValidPos();
        this.f.x = pos.x;
        this.f.y = pos.y;

    }

    // Check for collision against boundaries
    if (this.snake.head.x >= 400 || this.snake.head.x <= 0 || this.snake.head.y <= 0 || this.snake.head.y >= 400) {
        endGame();
    }
}

function endGame() {
    background(400);
    noLoop();
    // Draw score one last time
    fill('black');
    stroke('black');
    text('Well done! Your final score was: ' + score, 200, 200);
}