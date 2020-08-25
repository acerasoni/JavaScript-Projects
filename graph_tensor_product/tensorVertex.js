class tensorVertex {
    constructor(x, y, diameter, v1, v2) {
        this.x = x;
        this.y = y;
        this.v1 = v1;
        this.v2 = v2;
        this.diameter = diameter;
        this.adjacent = new Set();
        this.rgbValuesOne = v1.rgbValues;
        this.rgbValuesTwo = v2.rgbValues;
        this.uid1 = v1.uid;
        this.uid2 = v2.uid;
    }

    addAdjacent(vertex) {
        this.adjacent.add(vertex);
    }

    draw() {
        let c1 = color(parseInt(this.rgbValuesOne.r), parseInt(this.rgbValuesOne.b), parseInt(this.rgbValuesOne.g));
        let c2 = color(parseInt(this.rgbValuesTwo.r), parseInt(this.rgbValuesTwo.b), parseInt(this.rgbValuesTwo.g));
        fill(c1);
        arc(this.x, this.y, 20, 20, radians(90), radians(270), OPEN);
        fill(c2);
        arc(this.x, this.y, 20, 20, radians(270), radians(90), OPEN);
    }

    isEqual(v) {
        // If one color is the same
        if ((this.rgbValuesOne.r === v.rgbValuesOne.r &&
                this.rgbValuesOne.g === v.rgbValuesOne.g && this.rgbValuesOne.b === v.rgbValuesOne.b) ||
            (this.rgbValuesTwo.r === v.rgbValuesOne.r &&
                this.rgbValuesTwo.g === v.rgbValuesOne.g && this.rgbValuesTwo.b === v.rgbValuesOne.b)) {
            if ((this.rgbValuesOne.r === v.rgbValuesTwo.r &&
                    this.rgbValuesOne.g === v.rgbValuesTwo.g && this.rgbValuesOne.b === v.rgbValuesTwo.b) ||
                (this.rgbValuesTwo.r === v.rgbValuesTwo.r &&
                    this.rgbValuesTwo.g === v.rgbValuesTwo.g && this.rgbValuesTwo.b === v.rgbValuesTwo.b)) {
                return true;
            }

        }
        return false;
    }

    hasUid(uid1, uid2) {
        console.log(uid1 + " " + uid2 + " <> " + this.uid1 + " " + this.uid2);
        if ((uid1 === this.uid1 && uid2 === this.uid2) || (uid1 === this.uid2 && uid2 === this.uid1)) {
            console.log("Found Match! " + uid1 + " " + uid2 + " <> " + this.uid1 + " " + this.uid2);
            return true;
        }
    }
}