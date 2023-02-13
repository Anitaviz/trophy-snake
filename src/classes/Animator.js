import eventBus from 'tiny-emitter/instance';
import { gsap } from "gsap";

class Animator {
    init() {
        eventBus.on('eatFood', () => {
           //FIXME: Add floating text with ganied score on food pickup
        });
        eventBus.on('snakeDied', () => {
            gsap.timeline({ repeat: 2 })
                .to("#gameFieldTable", { x: 20, duration: .1 })
                .to("#gameFieldTable", { x: -20, duration: .1 })
                .to("#gameFieldTable", { x: 0, duration: .1 })
                .play();
        });
        eventBus.on('gameEnd', () => {
            gsap.timeline()
                .to("#gameFieldTable", { scale: 0, transformOrigin: "50% 50%", duration: 1 })
                .play();
        });
        eventBus.on('newGame', () => {
            gsap.timeline()
                .to("#gameFieldTable", { scale: 1, transformOrigin: "50% 50%", duration: 1 })
                .play();
        });

    }

}

export default Animator;