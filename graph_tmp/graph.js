const NUM_EDGES = 5;
const NUM_VERTICES = 5;
const MIN_DISTANCE = 15;

class graph {
    constructor(startX, endX, textX, textY) {
        this.startX = startX;
        this.endX = endX;
        this.textX = textX;
        this.textY = textY;

        this.colors = new Set();
        this.vertices = new Array();
        this.edges = new Array();

        for (var vces = 0; vces < NUM_VERTICES; vces++) {
            this.addVertex();
        }

        for (var eges = 0; eges < NUM_EDGES; eges++) {
            this.addEdge();
        }
        this.vertices.forEach(v => {
            this.colorVertex(v);
        })
    }

    draw() {
        this.vertices.forEach(v => {
            v.draw();
        });

        stroke(51);
        this.edges.forEach(e => {
            e.draw();
        });

        fill('black');
        text('Number of Vertices: ' + this.vertices.length, this.textX, this.textY);
        text('Number of Edges: ' + this.edges.length, this.textX, this.textY + 20);
        text('Number of Colors (minimum): ' + this.colors.size, this.textX, this.textY + 40);
    }

    colorVertex(v) {
        var solutionFound = false;

        // First try to pick one of the available colors
        this.colors.forEach(color => {
            if (this.isColorValid(color, v)) {
                v.setColor(color);
                solutionFound = true;
            }
        });

        if (solutionFound) return;

        // If no valid colors are available, create a new one
        let rgbValues = this.random_rgb();

        while (!this.isColorValid(rgbValues, v)) {
            rgbValues = this.random_rgb();
        }

        this.colors.add(rgbValues);
        v.setColor(rgbValues);
    }

    isColorValid(rgbValues, vertex) {

        for (const adj of vertex.adjacent) {
            if (this.areColorsEquivalent(adj.rgbValues, rgbValues)) {
                return false;
            }

        }
        return true;
    }

    addEdge() {
        if (this.vertices.length < 2) return;

        var index1 = this.getRandomInt(0, this.vertices.length - 1);
        var index2 = this.getRandomInt(0, this.vertices.length - 1);
        while (index1 == index2 || this.edgeExists(index1, index2)) {
            index2 = this.getRandomInt(0, this.vertices.length - 1);
        }

        this.vertices[index1].addAdjacent(this.vertices[index2]);
        this.vertices[index2].addAdjacent(this.vertices[index1]);
        this.edges.push(new edge(this.vertices[index1], this.vertices[index2]));
    }

    edgeExists(index1, index2) {
        for (var i = 0; i < this.edges.length; i++) {
            if (this.edges[i].vertexOne === this.vertices[index1] && this.edges[i].vertexTwo === this.vertices[index2]) {
                return true;
            }

            if (this.edges[i].vertexOne === this.vertices[index2] && this.edges[i].vertexTwo === this.vertices[index1]) {
                return true;
            }

        }
        return false;
    }

    addVertex() {
        var v = new vertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_WIDTH_HEIGHT - 10), 20);

        while (!this.isValid(v)) {
            v = new vertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_WIDTH_HEIGHT - 10), 20);
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

    // False - invalid. True - valid.
    static checkCollisionAndDistanceBetweenCircles(c1, c2) {
        var distSq = (c1.x - c2.x) * (c1.x - c2.x) +
            (c1.y - c2.y) * (c1.y - c2.y);
        var radSumSq = (c1.diameter / 2 + c2.diameter / 2) * (c1.diameter / 2 + c2.diameter / 2);

        // Check for collision on border OR for intersection
        if (distSq == radSumSq || distSq < radSumSq) {
            return false;
        }

        // Check if distance is enough
        if ((distSq - radSumSq) < MIN_DISTANCE) {
            return false;
        }

        return true;
    }


    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    random_rgb() {
        return {
            r: this.getRandomInt(0, 255),
            g: this.getRandomInt(0, 255),
            b: this.getRandomInt(0, 255)
        };
    }

    areColorsEquivalent(c1, c2) {
        if (c1.r === c2.r && c1.g === c2.g && c1.b === c2.b) return true;
        else return false;
    }
}