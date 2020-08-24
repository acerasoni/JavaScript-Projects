// Calculates tensor product between two graphs
class tensorProduct {
    constructor(startX, endX, graphOne, graphTwo, textX, textY) {
        this.startX = startX;
        this.endX = endX;
        this.textX = textX;
        this.textY = textY;
        this.graphOne = graphOne;
        this.graphTwo = graphTwo;
        this.vertices = new Array();

        graphOne.vertices.forEach(v1 => {
            graphTwo.vertices.forEach(v2 => {
                this.addVertex(v1.rgbValues, v2.rgbValues);
            });
        });

    }

    draw() {
        this.vertices.forEach(v => {
            v.draw();
        });

        fill('black');
        text('Number of Vertices: ' + this.vertices.length, this.textX, this.textY);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    addVertex(colorOne, colorTwo) {
        var v = new tensorVertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_WIDTH_HEIGHT - 10), 20, colorOne, colorTwo);

        while (!this.isValid(v)) {
            v = new vertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_WIDTH_HEIGHT - 10), 20, colorOne, colorTwo);
        };

        this.vertices.push(v);
    }

    // False - invalid. True - valid.
    isValid(vertex) {
        this.vertices.forEach(current => {
            if (!graph.checkCollisionAndDistanceBetweenCircles(current, vertex)) {
                return false;
            }
        });

        return true;
    }
}