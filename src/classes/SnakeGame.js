import { gameState } from '@/classes/GameState';
import Snake from '@/classes/Snake';
import eventBus from 'tiny-emitter/instance';
import { GAME_AREA_WIDTH, GAME_AREA_HEIGHT, FOOD_BASE_VALUE, GAME_MAX_SPEED, FOOD_SPEED_INCREASE } from '@/Constants';
import Point from './Point';

class SnakeGame {

    gameLoop() {
        if (gameState.isRunning()) {

            //Move snake and get new head position
            const newPosition = gameState.getSnake().moveSnake();

            //Emit event to allow for sound/animation
            eventBus.emit('snakeMove');

            //Check if snake is eating itself
            if (gameState.getSnake().isSnakeEatingSelf()) {
                this.die();
                return;
            }

            //Check if snake is out of bounds
            if (this.isSnakeOutOfBounds(newPosition)) {
                this.die();
                return;
            }

            if (this.isSnakeEatingFood(newPosition)) {
                //Handle snake eating food and score increase
                const scoreIncrease = Math.floor(FOOD_BASE_VALUE * gameState.getSnake().size);
                gameState.increaseScore(scoreIncrease);
                gameState.getSnake().size += 1;

                //Emit eatFood event to allow for sound/animation
                eventBus.emit('eatFood', newPosition, scoreIncrease);

                //Calculate new speed and clamp it to max speed
                gameState.setSpeed(Math.min(gameState.getSpeed() + FOOD_SPEED_INCREASE, GAME_MAX_SPEED));

                //Create new food;
                gameState.setFood(this.makeFood());
            }
            gameState.tick();
        }
    }

    init() {
        eventBus.on('tick', () => { this.gameLoop() });
        document.onkeydown = (evt) => {
            eventBus.emit('keyPress', evt);
            if (gameState.isRunning()) {
                this.handleKeyPress(evt);
            }
        };
    }

    handleKeyPress(keyEvt) {
        //Very simple key controlls
        /**
         * FIXME: It is not enough to check the current direction of the snake,
         * we need to check the direction it last moved, otherwise quick key combos 
         * can still make the snake travel in the opposite direction of its last move
         * resulting in insta death.
         * 
         * */
        switch (keyEvt.keyCode) {
            case 87:
            case 38:
                if (gameState.getSnake().direction != Snake.DIRECTION_DOWN) {
                    gameState.getSnake().direction = Snake.DIRECTION_UP;
                }
                break;
            case 68:
            case 39:
                if (gameState.getSnake().direction != Snake.DIRECTION_LEFT) {
                    gameState.getSnake().direction = Snake.DIRECTION_RIGHT;
                }
                break;
            case 83:
            case 40:
                if (gameState.getSnake().direction != Snake.DIRECTION_UP) {
                    gameState.getSnake().direction = Snake.DIRECTION_DOWN;
                }
                break;
            case 65:
            case 37:
                if (gameState.getSnake().direction != Snake.DIRECTION_RIGHT) {
                    gameState.getSnake().direction = Snake.DIRECTION_LEFT;
                }
                break;
        }
    }

    isSnakeEatingFood(position) {
        return gameState.getFood().compare(position);
    }

    isSnakeOutOfBounds(position) {
        return position.x <= 0 ||
               position.y <= 0 ||
               position.x >  GAME_AREA_WIDTH ||
               position.y >  GAME_AREA_HEIGHT;

    }
    newGame() {
        gameState.newGame();

        eventBus.emit("newGame");

        gameState.setFood(this.makeFood());

        this.askForPlayerName()
            .then((playerName) => {
                gameState.setName(playerName);
                return this.askForKeyPress();
            })
            .then(() => {
                this.startGame()
            });
    }

    askForKeyPress() {
        //FIXME: This should use some kind of animation to show the message in the playArea
        gameState.setMessage('Press any key to start playing');
        return new Promise((resolve) => {
            eventBus.once('keyPress', key => {
                gameState.clearMessage();
                this.handleKeyPress(key)
                resolve(key);
            })
        });
    }

    askForPlayerName(text) {
        /**
         * FIXME: This should show a nicer input than the browser prompt
         * */
        return new Promise((resolve) => {
            const name = prompt(text ? text : 'What is your name');
            if (name && name != '') {
                resolve(name);
            } else {
                this.askForPlayerName('Invalid name try another one');
            }
        });
    }

    startGame() {
        gameState.runGame();
    }

    /**
     * FIXME: Should probably use a list of empty cells and randomize that 
     * instead of looping a random position witch will lead to increased misses
     * as the snake fills the play area
     * */
    makeFood() {
        let position = null;
        do {
            position = new Point(
                Math.floor(Math.random() * (GAME_AREA_WIDTH - 1)) + 1,
                Math.floor(Math.random() * (GAME_AREA_HEIGHT - 1)) + 1
            );
        } while (gameState.getSnake().isPointOnSnake(position))
        return position;
    }

    reset() {
        gameState.reset();
    }

    die() {
        gameState.decreaseLives();
        if (gameState.getLives() <= 0) {
            //Only do gameover if no more lives are left
            eventBus.emit('gameEnd');
            gameState.endGame();
        } else {
            //If player has more lives emit a snakeDied event to allow for sound, animation etc.
            eventBus.emit('snakeDied');

            //Reset the game
            this.reset();

            //And await player input
            this.askForKeyPress().then(() => {
                this.startGame();
            })
        }
    }


}

const snakeGame = new SnakeGame();
export default snakeGame;