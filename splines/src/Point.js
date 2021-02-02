export class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    translate(p) {
        this.x += p.x;
        this.y += p.y;
    }
}
