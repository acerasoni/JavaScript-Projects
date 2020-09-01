class wolf extends animal {
    static xOffset = +2;
    static yOffset = -7;

    constructor(x, y) {
        let texture = 'W';
        super(x, y, wolf.xOffset, wolf.xOffset, texture);
    }

}