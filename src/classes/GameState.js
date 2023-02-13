import { reactive } from 'vue';
import Snake from '@/classes/Snake'
import { START_GAME_SPEED, MAX_LIVES } from '@/Constants';
/**
 * FIXME: Gamestate init should be set by SnakeGame to allow for different rules/difficulty
 * */
export const gameState = reactive({
    _score: 0,
    _snake: null,
    _speed: START_GAME_SPEED,
    _lives: MAX_LIVES,
    _maxLives: MAX_LIVES,
    _isRunning: false,
    /**
     * FIXME: Food should be an array of pickups instead with a class used to show the pickup
     * and a callback for the effect of the pickup.
     * That way fun stuff can be made like teleporters, room transitions, extra lives etc.
     * */
    _food: null,
    _timeElapsed: 0,
    _startTime: 0,
    _name: null,
    _message: null,
    _gameHasStarted: false,

    getFood() {
        return this._food;
    },
    setFood(position) {
        this._food = position;
    },
    getScore() {
        return this._score;
    },
    increaseScore(value) {
        this._score += value;
    },
    getSnake() {
        return this._snake;
    },
    setName(name) {
        this._name = name;
    },
    getName() {
        return this._name;
    },
    hasMessage() {
        return this._message !== null;
    },
    getMessage() {
        return this._message;
    },
    setMessage(message) {
        this._message = message;
    },
    clearMessage() {
        this._message = null;
    },
    getSpeed() {
        return 1000 - this._speed;
    },
    setSpeed(newSpeed) {
        this._speed = 1000 - newSpeed;
    },
    isRunning() {
        return this._isRunning;
    },
    getLives() {
        return this._lives;
    },
    getMaxLives() {
        return this._maxLives;
    },
    getTimeElapsed() {
        return this._timeElapsed;
    },
    runGame() {
        this._isRunning = true;
    },
    reset() {
        this._snake = new Snake();
        this._speed = START_GAME_SPEED;
        this._isRunning = false;
        this._startTime = null;
    },
    newGame() {
        this._gameHasStarted = true;
        this._lives = MAX_LIVES;
        this._score = 0;
        this.reset();
    },
    decreaseLives() {
        this._lives -= 1;
    },
    hasGameBeenStarted() {
        return this._gameHasStarted;
    },
    endGame() {
        this._gameHasStarted = false;
        this.reset();
    },
    tick() {
        if (!this._startTime) {
            this._startTime = Math.floor(Date.now() / 1000);
        }
        this._timeElapsed = Math.floor(Date.now() / 1000) - this._startTime;
    }
});