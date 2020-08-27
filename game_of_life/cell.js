class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alive = Math.random() >= 0.5;;
        this.tmpAlive = this.alive;
    }

    draw() {
        if (this.alive) {
            rect(this.x, this.y, 20, 20);
        }

    }
}