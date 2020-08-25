class vertex {
    constructor(x, y, diameter) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.adjacent = new Set();
        this.rgbValues = {
            r: -1,
            r: -1,
            b: -1
        }

        // 10-length UID
        this.uid = uid(10);
    }

    setColor(rgbValues) {
        this.rgbValues = rgbValues;
    }

    addAdjacent(vertex) {
        this.adjacent.add(vertex);
    }

    draw() {
        let c = color(parseInt(this.rgbValues.r), parseInt(this.rgbValues.b), parseInt(this.rgbValues.g));
        fill(c);
        circle(this.x, this.y, this.diameter);
    }

}