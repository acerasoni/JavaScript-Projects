// Screen settings. Both must be multiples of 20
const SCREEN_WIDTH = 1400;
const SCREEN_HEIGHT = 660;
const FRAME_RATE = 15;

function setup() {
    fill('black');
    frameRate(FRAME_RATE);
    createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
    this.grid = new Array();
    this.cells = new Array();
    for (var i = 0; i <= SCREEN_WIDTH; i++) {

        for (var k = 0; k <= SCREEN_HEIGHT; k++) {
            // Don't draw a cell on the bottom right corner, as this would be invisible
            if (i == SCREEN_WIDTH || k == SCREEN_HEIGHT) break;
            if (i % 20 == 0 && k % 20 == 0) {
                this.cells.push(new cell(i, k));
            }
        }
        if (i % 20 == 0) {
            this.grid.push(new straightLine(0, i, SCREEN_WIDTH, i));
            this.grid.push(new straightLine(i, 0, i, SCREEN_WIDTH));
        }
    }

}

function draw() {
    computeInteractions();
    background(220);

    stroke('white')
        // Draw grid
    grid.forEach(l => l.draw());

    fill('black');
    this.cells.forEach(cell => {
        cell.draw();
    })
}

function computeInteractions() {
    // Compute next statae
    this.cells.forEach(cell => {
        // Edge cases
        if (cell.x == 0 || cell.y == 0 || cell.x === SCREEN_WIDTH - 20 || cell.y == SCREEN_HEIGHT - 20) {
            if (cell.x == 0 || cell.y == 0) {
                if (cell.x != 0) {
                    // Left-most column
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x || cellAdj.x === cell.x - 20 ||
                        cellAdj.x === cell.x + 20) && (cellAdj.y === cell.y ||
                        cellAdj.y === cell.y + 20));
                } else if (cell.y != 0) {
                    // Bottom row
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x ||
                        cellAdj.x === cell.x + 20) && (cellAdj.y === cell.y || cellAdj.y === cell.y - 20 ||
                        cellAdj.y === cell.y + 20));

                } else {
                    // Bottom left corner
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x ||
                        cellAdj.x === cell.x + 20) && (cellAdj.y === cell.y ||
                        cellAdj.y === cell.y + 20));
                }
            }

            if (cell.x == SCREEN_WIDTH - 20 || cell.y == SCREEN_HEIGHT - 20) {

                if (cell.x != SCREEN_WIDTH - 20) {
                    // Right-most columns
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x || cellAdj.x === cell.x - 20 ||
                        cellAdj.x === cell.x + 20) && (cellAdj.y === cell.y || cellAdj.y === cell.y - 20));


                } else if (cell.y != SCREEN_HEIGHT - 20) {
                    // Top row
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x || cellAdj.x === cell.x - 20) && (cellAdj.y === cell.y || cellAdj.y === cell.y - 20 ||
                        cellAdj.y === cell.y + 20));


                } else {
                    // Top left corner
                    var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x || cellAdj.x === cell.x - 20) && (cellAdj.y === cell.y || cellAdj.y === cell.y - 20));

                }
            }

        } else {
            var adj = this.cells.filter(cellAdj => (cellAdj.x === cell.x || cellAdj.x === cell.x - 20 ||
                cellAdj.x === cell.x + 20) && (cellAdj.y === cell.y || cellAdj.y === cell.y - 20 ||
                cellAdj.y === cell.y + 20));
        }
        // Remove itself
        adj = adj.filter(cellAdj => cellAdj !== cell);

        var alive = 0;

        // Count dead/alive
        adj.forEach(adjCell => {
            if (adjCell.alive) {
                alive++;
            }
        });

        if (cell.alive) {
            if (alive < 2) {
                cell.tmpAlive = false;
            } else if (alive > 3) {
                cell.tmpAlive = false;
            }
        } else {
            if (alive === 3) {
                cell.tmpAlive = true;
            }
        }

    });

    // Set next state
    this.cells.forEach(cell => {
        cell.alive = cell.tmpAlive;
    });
}