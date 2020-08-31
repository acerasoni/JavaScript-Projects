class entity {
    constructor(x, y, texture) {
        // Position
        this.x = x;
        this.y = y;

        // Texture
        this.texture = texture;
    }

    draw() {
        text(this.texture, this.x, this.y);
    }

    moveUp() {
        this.y -= 50;
    }

    moveDown() {
        this.y += 50;
    }

    moveLeft() {
        this.x -= 50;
    }

    moveRight() {
        this.x += 50;
    }
}