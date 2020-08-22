class fruit {
    constructor() {
        var pos = fruit.getValidPos();
        this.x = pos.x;
        this.y = pos.y;
    }

    draw() {
        fill('black');
        stroke('black')
        circle(this.x, this.y, 20);
        fill('white');
        stroke('white')
    }

    static getValidPos() {
        var x, y;

        do {
            x = Math.floor(Math.random() * 400);
        } while (x % 10 != 0 || ((x / 10) % 2 == 0));

        do {
            y = Math.floor(Math.random() * 400);
        } while (y % 10 != 0 || ((y / 10) % 2 == 0));

        return {
            x: x,
            y: y
        }
    }
}