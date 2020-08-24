class tensorVertex {
    constructor(x, y, diameter, colorOne, colorTwo) {
        this.x = x;
        this.y = y;
        this.diameter = diameter;
        this.adjacent = new Set();
        this.rgbValuesOne = colorOne;
        this.rgbValuesTwo = colorTwo;
    }

    addAdjacent(vertex) {
        this.adjacent.add(vertex);
    }

    draw() {
        let c1 = color(parseInt(this.rgbValuesOne.r), parseInt(this.rgbValuesOne.b), parseInt(this.rgbValuesOne.g));
        let c2 = color(parseInt(this.rgbValuesTwo.r), parseInt(this.rgbValuesTwo.b), parseInt(this.rgbValuesTwo.g));
        fill(c1);
        arc(this.x, this.y, 20, 20, radians(90), radians(270));
        fill(c2);
        arc(this.x, this.y, 20, 20, radians(270), radians(90));
    }

}