class LFZGMenu extends Phaser.Scene {
    constructor() {
        super("menu");
    };
    preload() {
        this.load.image('MenuBack', "/assets/graveyard.png", { frameWidth: 1920, frameHeight: 900 });
        this.load.image('Fighter', "/assets/Fighter.jpg", { frameWidth: 619, frameHeight: 179 });
        this.load.image('ZombieLogo', "/assets/ZombieLogo.jpg", { frameWidth: 982, frameHeight: 786 });
        this.load.image('blackboard', "/assets/blackboard.png", { frameWidth: 512, frameHeight: 512 });
        this.load.audio('choose', "/data/m_ok.wav");
        this.load.audio('join', "/data/m_join.wav");
        this.load.audio('bkmusic', "/data/dungeongate02.ogg");
    }
    create() {
        this.music = this.sound.add('bkmusic');
        // background
        this.background = this.add.image(400, 250, 'MenuBack');
        this.background.setDisplaySize(1230, 600);
        this.board = this.add.image(412, 205, 'blackboard');
        this.board.setDisplaySize(235, 110);
        this.board.setRotation(1 / 57);
        this.fighter = this.add.image(415, 210, 'Fighter');
        this.fighter.setDisplaySize(260, 75);
        this.zombieLogo = this.add.image(410, 200, 'ZombieLogo');
        this.zombieLogo.setDisplaySize(300, 250);
        this.txt1 = this.add.text(350, 350, 'start', { font: "bold 60px TimeNewRome" });
        this.txt1.setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                this.scene.sound.play('choose');
                this.scene.music.stop();
                this.scene.scene.start("bootgame");
            })
            .on('pointerover', () => this.enterButtonHoverState())
            .on('pointerout', () => this.enterButtonRestState());
        // versioin
        this.txt2 = this.add.text(690, 475, 'version: 1.0', { font: "bold 20px TimeNewRome" });
        this.txt3 = this.add.text(20, 20, '音樂:', { font: "bold 20px TimeNewRome" });
        this.txt4 = this.add.text(100, 20, '關閉', { font: "bold 20px TimeNewRome" });
        this.txt4.setInteractive({ useHandCursor: true })
            .on('pointerdown', function () {
                if (this.scene.music.isPlaying) {
                    this.scene.music.pause();
                    this.scene.txt4.setText('關閉中');
                } else {
                    if(this.scene.music.isPaused){
                        this.scene.music.resume();
                        this.scene.txt4.setText('開啟中');
                    }else{
                        this.scene.music.play();
                        this.scene.txt4.setText('開啟中');
                    }
                };
            })
            .on('pointerover', () => this.musicHoverState())
            .on('pointerout', () => this.musicRestState());
    };
    enterButtonHoverState() {
        this.txt1.setColor('#ff0');
        this.sound.play('join');
    };
    enterButtonRestState() {
        this.txt1.setColor('#fff');
    };
    musicHoverState() {
        this.txt4.setColor('#ff0');
        this.sound.play('join');
    };
    musicRestState() {
        this.txt4.setColor('#fff');
    };

}