class animal extends entity {

    constructor(x, y, xTextureOffset, yTextureOffset, texture) {

        super(x, y, xTextureOffset, yTextureOffset, texture);

        // Food
        this.food = 50;
        // Water
        this.water = 50;

        // Reproduction

        // Oxygen
        this.oxygen = 50;
    }


    move(direction) {
        var offset, orientation;

        switch (direction) {
            case "UP":
                offset = -50;
                orientation = "VERTICAL";
                break;
            case "DOWN":
                offset = 50;
                orientation = "VERTICAL";
                break;
            case "LEFT":
                offset = -50;
                orientation = "HORIZONTAL";
                break;
            case "RIGHT":
                offset = 50;
                orientation = "HORIZONTAL";
                break;
        }

        var xCheck, yCheck;

        if (orientation === "VERTICAL") {
            xCheck = this.x;
            yCheck = this.y + offset;
        } else {
            xCheck = this.x + offset;
            yCheck = this.y;
        }

        var tile;

        for (var i = 0; i < terrain.map.length; i++) {
            var current = terrain.map[i];
            if (current.x === xCheck && current.y === yCheck) {
                tile = current;
                break;
            }
        }

        if (tile instanceof dirt) {
            console.log("Rabbit: " + this.x + " " + this.y);
            console.log("Tile: " + xCheck + " " + yCheck);

            this.x = xCheck;
            this.y = yCheck;
        }
    }

}