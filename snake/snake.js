class snake {

    bodypart = class {
        next;
        previous;

        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        draw() {
            circle(this.x, this.y, 20);
        }
    }

    constructor() {
        var pos = fruit.getValidPos();

        this.head = new this.bodypart(pos.x, pos.y);
        this.head.next = null;
        this.head.previous = null;
        this.tail = this.head;

    }

    addBodyPart(snakeX, snakeY, fruitX, fruitY) {
        if (this.head === this.tail) {
            var newX;
            var newY;

            if (fruitX < snakeX) {
                // Fruit left
                newY = this.head.y;
                newX = this.head.x + 20;
            } else if (fruitX === snakeX) {
                // Fruit Up or Down
                if (fruitY > snakeY) {
                    // Fruit Up
                    newY = this.head.y - 2;
                    newX = this.head.x;
                } else {
                    // Fruit Down
                    newY = this.head.y + 20;
                    newX = this.head.x;
                }
            } else {
                // Fruit right
                newY = this.head.y;
                newX = this.head.x - 20;
            }
            var newPart = new this.bodypart(newX, newY);
            this.head.next = newPart;
            newPart.previous = this.head;
            newPart.next = null;
            this.tail = newPart;
        } else {
            var newX;
            var newY;

            var pivot = this.tail.previous;
            if (pivot.x < this.tail.x) {
                // To the left
                newX = this.tail.x + 20;
                newY = this.tail.y;
            } else if (pivot.x === this.tail.x) {
                // Up or Down
                if (pivot.y > this.tail.y) {
                    // Up
                    newX = this.tail.x;
                    newY = this.tail.y - 20;
                } else {
                    // Down
                    newX = this.tail.x;
                    newY = this.tail.y + 20;
                }
            } else {
                // To the right
                newX = this.tail.x - 20;
                newY = this.tail.y;
            }

            var newPart = new this.bodypart(newX, newY);

            this.tail.next = newPart;
            newPart.previous = this.tail;
            this.tail = newPart;
            this.tail.next = null;
        }
    }

    draw() {
        var current = this.head;
        while (current != null) {
            current.draw();
            current = current.next;
        }
    }

    moveHorizontally(x) {
        this.move(this.head.x + x, this.head.y);
        this.head.x += x;

    }

    moveVertically(y) {
        this.move(this.head.x, this.head.y + y);
        this.head.y += y;
    }

    move(x, y) {
        var current = this.tail;
        // Condition only occurs at the head
        while (current.previous != null) {
            // Check if head collides with other bodyparts
            if (current.x === x && current.y === y) {
                endGame();
            }
            current.x = current.previous.x;
            current.y = current.previous.y;
            current = current.previous;
        }
    }

    getBlockedDirection() {
        // -1 = none, 0 = up, 1 = down, 2 = left, 3 = right
        if (this.head === this.tail) return -1;

        if (this.head.next.x < this.head.x) {
            // Left
            return 2;
        } else if (this.head.next.x > this.head.x) {
            // Right
            return 3;
        } else {
            // Up or Down
            if (this.head.next.y < this.head.y) {
                // Up
                return 0;
            } else {
                // Down
                return 1;
            }
        }

    }
}