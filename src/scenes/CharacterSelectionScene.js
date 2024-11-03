import Phaser from 'phaser';

class CharacterSelectionScene extends Phaser.Scene {
    constructor() {
        super({ key: 'CharacterSelectionScene' });
    }

    preload() {

    }

    create() {
        this.add.text(100, 100, 'Sélectionnez un personnage', { fontSize: '32px', fill: '#fff' });
        
        this.input.on('pointerdown', this.selectCharacter, this);
    }

    selectCharacter(pointer) {
    
        const characterId = this.getCharacterIdFromPointer(pointer);
        if (characterId !== null) {
            this.scene.start('BattleScene', { selectedCharacter: characterId });
        }
    }

    getCharacterIdFromPointer(pointer) {
    
        return 1; 
    }
}

export default CharacterSelectionScene;
