class terrain {

    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.color = color(r, g, b);
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, this.x + 50, this.y + 50);
    }
}