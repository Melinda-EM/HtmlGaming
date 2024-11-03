import MenuScene from "./scenes/MenuScene";
import BattleScene from "./scenes/BattleScene";
import CharacterSelectionScene from "./scenes/CharacterSelectionScene";

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#000000',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [MenuScene, CharacterSelectionScene, BattleScene]
};

const game = new Phaser.Game(config);

window.addEventListener('load', function() {
    window.addEventListener('click', function() {
        fightingGame.start();
    }, { once: true });
})
