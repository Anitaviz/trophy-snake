import Point from '@/classes/Point';
import { SNAKE_START_X, SNAKE_START_Y, SNAKE_START_DIRECTION } from '@/Constants';

/**
 * Stores info about a snake :)
 * */
class Snake {
    direction = SNAKE_START_DIRECTION;
    /**
     * List of points the snake is in.
     * Snake is stored so its head is in position 0 (points[0])
     * since the head is the important part, and this makes it easy to index.
     * */
    points = [new Point(SNAKE_START_X, SNAKE_START_Y)];
    size = 5;

    static get DIRECTION_UP() {
        return 1;
    }
    static get DIRECTION_RIGHT() {
        return 1 << 1;
    }
    static get DIRECTION_DOWN() {
        return 1 << 2;
    }
    static get DIRECTION_LEFT() {
        return 1 << 3;
    }

    get size() {
        return this.size;
    }
    get direction() {
        return this.direction;
    }
    get head() {
        return this.points[0].clone();
    }
    set direction(direction) {
        this.direction = direction;
    }
    get points() {
        return this.points.map(point => point.clone() );
    }
    isSnakeEatingSelf() {
        /*
         * Use a set of the snakes points (converted to strings) to quickly check if there are any duplicates
         * since a duplicate means the snake is eating itself
        */
        return new Set(this.points.map(t => { return t.toString() })).size < this.points.length;
    }
    isPointOnSnake(pointToCheck) {
        return !this.points.every(point => { return !point.compare(pointToCheck) });
    }

    moveSnake() {
        //Clone head of snake as base point for moving
        const new_pos = this.points[0].clone();

        //Move snake in the direction it is facing
        switch (this.direction) {
            case Snake.DIRECTION_UP:
                new_pos.y--;
                break;
            case Snake.DIRECTION_DOWN:
                new_pos.y++;
                break
            case Snake.DIRECTION_RIGHT:
                new_pos.x++;
                break
            case Snake.DIRECTION_LEFT:
                new_pos.x--;
                break
            default:
                throw new Error('Invalid snake move direction encountered: ' + this.direction + ': ' + this.DIRECTION_UP);
        }
        //Add new location as snake head
        this.points.unshift(new_pos);

        //If number of points is greater than the size the snake should currently be, remove its tail
        if (this.points.length > this.size) {
            this.points.pop();
        }

        //Return clone of the heads position to facilitate checking for death, pickups, etc.
        //But prevent changing the location outside this class
        return new_pos.clone();
    }


}

export default Snake;