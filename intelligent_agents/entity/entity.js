class entity {
    constructor(x, y, xTextureOffset, yTextureOffset, texture) {
        // Position
        this.x = x;

        this.y = y;

        // Texture offset
        this.xTextureOffset = xTextureOffset;
        this.yTextureOffset = yTextureOffset;

        // Texture
        this.texture = texture;
    }

    draw() {
        text(this.texture, this.x + this.xTextureOffset, this.y + this.yTextureOffset);
    }

}