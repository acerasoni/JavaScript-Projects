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

    addBodyPart() {
        if (this.head === this.tail) {
            // TODO: Static position, CHANGE THIS
            var newPart = new this.bodypart(this.head.x + 20, this.head.y);
            this.head.next = newPart;
            newPart.previous = this.head;
            newPart.next = null;
            this.tail = newPart;
        } else {
            var newX,
                var newY;

            var pivot = tail.previous;
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
        this.move();
        this.head.x += x;

    }

    moveVertically(y) {
        this.move();
        this.head.y += y;
    }

    move() {
        var current = this.head.next;
        while (current != null) {
            current.x = current.previous.x;
            current.y = current.previous.y;
        }
    }

}