class terrain {

    static map = new Array();

    constructor(x, y, r, g, b) {
        this.x = x;
        this.y = y;
        this.color = color(r, g, b);
    }

    draw() {
        fill(this.color);
        rect(this.x, this.y, 50, 50);
    }
}