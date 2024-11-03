export class SceneManager {
    constructor() {
        this.currentScene = null;
    }

    switchTo(scene) {
        if (this.currentScene) {
            this.currentScene.exit(); // Nettoyer l'ancienne scène
        }
        this.currentScene = scene;
        this.currentScene.enter(); // Initialiser la nouvelle scène
    }

    update(time, ctx) {
        if (this.currentScene) {
            this.currentScene.update(time, ctx);
        }
    }

    draw(ctx) {
        if (this.currentScene) {
            this.currentScene.draw(ctx);
        }
    }
}
