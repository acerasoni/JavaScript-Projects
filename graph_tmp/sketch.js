var MIN_DISTANCE = 5;

function setup() {
    createCanvas(400, 400);

    this.colors = new Set();
    this.vertices = new Array();
    this.edges = new Array();

    addVertex();
    addVertex();
    addVertex();

    addEdge();

    this.vertices.forEach(v => {
        colorVertex(v);
    })

}

function draw() {
    background(220);

    noStroke();
    this.vertices.forEach(v => {
        v.draw();
    });

    stroke(51);
    this.edges.forEach(e => {
        e.draw();
    });
}

function colorVertex(v) {
    var solutionFound = false;

    // First try to pick one of the available colors
    this.colors.forEach(color => {
        if (isColorValid(color, v)) {
            v.setColor(color);
            solutionFound = true;
        }
    });

    if (solutionFound) return;

    // If no valid colors are available, create a new one
    let rgbValues = random_rgb();

    while (!isColorValid(rgbValues, v)) {
        rgbValues = random_rgb();
    }

    this.colors.add(rgbValues);
    v.setColor(rgbValues);
}

function isColorValid(rgbValues, vertex) {

    for (const adj of vertex.adjacent) {
        if (areColorsEquivalent(adj.rgbValues, rgbValues)) {
            return false;
        }

    }
    return true;
}

function addEdge() {
    if (this.vertices.length < 2) return;

    var index1 = getRandomInt(0, this.vertices.length - 1);
    var index2 = getRandomInt(0, this.vertices.length - 1);
    while (index1 == index2) {
        index2 = getRandomInt(0, this.vertices.length - 1);
    }

    this.vertices[index1].addAdjacent(this.vertices[index2]);
    this.vertices[index2].addAdjacent(this.vertices[index1]);
    this.edges.push(new edge(this.vertices[index1], this.vertices[index2]));
}

function addVertex() {
    var v = new vertex(getRandomInt(10, 390), getRandomInt(10, 390), 20);

    while (!isValid(v)) {
        v = new vertex(getRandomInt(10, 390), getRandomInt(10, 390), 20);
    };

    this.vertices.push(v);
}

// False - invalid. True - valid.
function isValid(vertex) {
    this.vertices.forEach(current => {
        if (!checkCollisionAndDistanceBetweenCircles(current, vertex)) {
            return false;
        }
    });

    return true;
}

// False - invalid. True - valid.
function checkCollisionAndDistanceBetweenCircles(c1, c2) {
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


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function random_rgb() {
    return {
        r: getRandomInt(0, 255),
        g: getRandomInt(0, 255),
        b: getRandomInt(0, 255)
    };
}

function areColorsEquivalent(c1, c2) {
    if (c1.r === c2.r && c1.g === c2.g && c1.b === c2.b) return true;
    else return false;
}