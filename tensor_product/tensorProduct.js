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
        this.edges = new Array();

        graphOne.vertices.forEach(v1 => {
            graphTwo.vertices.forEach(v2 => {
                // Check if color exists already
                this.addVertex(v1, v2);
            });
        });

        this.addEdges();
    }

    draw() {
        this.vertices.forEach(v => {
            v.draw();
        });

        this.edges.forEach(e => {
            e.draw();
        });

        fill('black');
        text('Number of Vertices: ' + this.vertices.length, this.textX, this.textY);
        text('Number of Edges: ' + this.edges.length, this.textX, this.textY + 20);
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    addEdges() {

        this.vertices.forEach(v => {
            var vertsToConnect = new Set();
            v.v1.adjacent.forEach(adj1 => {
                v.v2.adjacent.forEach(adj2 => {
                    if (adj1 !== adj2) {

                        vertsToConnect.add(this.findWithUid(adj1.uid, adj2.uid));
                    }
                });
            });
            // Combination valid only if both v1 and v2 touch one color each

            vertsToConnect.forEach(vToConnect => {
                if (vToConnect === undefined) console.log("Errore");
                else {
                    this.edges.push(new edge(v, vToConnect));
                    vToConnect.addAdjacent(v);
                    v.addAdjacent(vToConnect);
                }

            })
        });
    }

    findWithUid(uid1, uid2) {
        for (var i = 0; i < this.vertices.length; i++) {
            var current = this.vertices[i];
            if (current.hasUid(uid1, uid2)) return current;
        }

        return undefined;
    }
    addVertex(v1, v2) {
        var v = new tensorVertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_HEIGHT - 10), 20,
            v1, v2);
        this.vertices.forEach(vTmp => {
            if (vTmp.isEqual(v)) {
                return;
            }
        })

        while (!this.isValid(v)) {
            v = new vertex(this.getRandomInt(this.startX, this.endX), this.getRandomInt(10, SCREEN_HEIGHT - 10), 20,
                v1, v2);
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