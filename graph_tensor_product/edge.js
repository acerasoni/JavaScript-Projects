class edge {
    constructor(vertexOne, vertexTwo) {
        this.vertexOne = vertexOne;
        this.vertexTwo = vertexTwo;
    }

    draw() {
        line(this.vertexOne.x, this.vertexOne.y, this.vertexTwo.x, this.vertexTwo.y);
    }
}