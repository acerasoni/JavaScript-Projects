class rabbit extends animal {

    static xOffset = +7;
    static yOffset = -7;


    constructor(x, y) {
        let texture = 'R';
        super(x, y, rabbit.xOffset, rabbit.yOffset, texture);
    }


}