import { pollGamepads, enregisterClavierEvents, enregisterManetteEvents } from './engine/GestionInput.js';
import { getCtx } from './utils/context.js';
import { BattleScene } from './scenes/BattleScene.js';

export class FightingGame {
    ctx = getCtx();
    
    frameTime = {
        previous: 0,
        secondsPassed: 0,
    }

    constructor() {
        this.scene = new BattleScene();
    }

    frame(time) {
        this.frameTime = {
            secondsPassed: (time - this.frameTime.previous) / 1000,
            previous: time,
        }

        pollGamepads();
        this.scene.update(this.frameTime, this.ctx);
        this.scene.draw(this.ctx);

        if (this.scene.statusBar.isGameOver()) {
            this.scene.draw(this.ctx);

            if (this.isRestartRequested()) {
                this.restartGame();
            }
        } else {
            this.scene.update(this.frameTime, this.ctx);
            this.scene.draw(this.ctx);
        }

        window.requestAnimationFrame(this.frame.bind(this));
    }

    isRestartRequested() {
        return /* logique pour détecter l'appui sur la touche espace */;
    }

    start() {
        enregisterClavierEvents();
        enregisterManetteEvents();
        window.addEventListener('restart', () => {
            this.restartGame();
        });
        window.requestAnimationFrame(this.frame.bind(this));
    }

    restartGame() {
        this.scene.statusBar.reset();
        this.scene = new BattleScene();
    }

}