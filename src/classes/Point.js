/**
 * Quick struct to store x,y coordinates
 * 
 * */
class Point {
    x
    y

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    toString() {
        return '{' + this.x + ',' + this.y + '}';
    }
    clone() {
        return new Point(this.x, this.y);
    }

    compare(point) {
        if (point.x == undefined || point.y == undefined) {
            throw new Error('Cant compare point to object without x and y fields');
        }
        return this.x == point.x && this.y == point.y;
    }
}
export default Point;