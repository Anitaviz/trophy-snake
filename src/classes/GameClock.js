import { gameState } from '@/classes/GameState';
import eventBus from 'tiny-emitter/instance';

/**
 * Game clock uses requestAnimationFrame to calculate delta time
 * */
export default class GameClock {

    init() {
        this.lastTime = 0;
        this.delta = 0;
        window.requestAnimationFrame(time => this.loop(time));
    }

    loop(time) {
        if (!this.lastTime) {
            this.lastTime = time;
        } else {
            this.delta += time - this.lastTime;
            this.lastTime = time;
            /**
             * FIXME: Game clock should be decoupled from gameState and just call a tick callback with delta time
             * instead and let that callback control the game speed
             * */
            if (this.delta > 1000 - gameState.getSpeed()) {
                this.delta -= 1000 - gameState.getSpeed();
                eventBus.emit('tick');
            }
        }
        window.requestAnimationFrame(time => this.loop(time));
    }
}