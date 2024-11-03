export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    preload() {
        this.load.image('background', './images/stage0.png');
        this.load.image('dio', './images/Dio1.png');
        this.load.image('jotaro', './images/Jotaro2.png');
        this.load.image('alien', './images/Alien.png');  
        // this.load.image('character3', './images/character3.png');  
        // this.load.image('character4', './images/character4.png');  
        // this.load.image('character5', './images/character5.png');  
        // this.load.image('character6', './images/character6.png');  
    }

    create() {
        console.log('MenuScene create called');
        this.add.text(this.scale.width / 2, this.scale.height / 4, 'Mortal Fighter ', { fontSize: '64px', fill: '#fff' }).setOrigin(0.5);
        this.add.text(this.scale.width / 2, this.scale.height / 4, 'Choisissez Votre Personnage', { fontSize: '48px', fill: '#fff' }).setOrigin(0.5);

        const dio = this.add.image(this.scale.width / 3, this.scale.height / 2, 'dio').setInteractive();
        const jotaro = this.add.image((this.scale.width / 3) * 2, this.scale.height / 2, 'jotaro').setInteractive();
        const alien = this.add.image(this.scale.width / 2, (this.scale.height / 2) + 100, 'alien').setInteractive();

        dio.on('pointerdown', () => this.startBattle('DIO'));
        jotaro.on('pointerdown', () => this.startBattle('JOTARO'));
        alien.on('pointerdown', () => this.startBattle('ALIEN'))
    }

    startBattle(selectedCharacter) {
        console.log(`Character selected: ${selectedCharacter}`);
        this.scene.start('BattleScene', { selectedCharacter });
    }
}