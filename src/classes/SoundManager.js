import eventBus from 'tiny-emitter/instance';

class SoundManager {
    #sounds = [];

    init() {
        this.loadSound('eat','eatFood', require('@/assets/eat.mp3'));
        this.loadSound('run','snakeMove', require('@/assets/run.mp3'));
        this.loadSound('death','snakeDied', require('@/assets/death.mp3'));
        this.loadSound('gameOver','gameEnd', require('@/assets/gameOver.mp3'));
    }

    play(name) {
        if (this.#sounds[name] !== undefined) {
            this.#sounds[name].cloneNode(true).play();
        }
    }
    loadSound(name,event, file) {
        this.#sounds[name] = new Audio(file);
        eventBus.on(event, () => { this.play(name) });

    }
}

export default SoundManager;