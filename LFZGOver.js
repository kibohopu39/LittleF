class LFZGOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }
    init(data) {

        console.log(data[0]);
        this.finalScore = data[0];

    };
    preload() {
        this.load.image('gameoverbk', "/assets/gameend.png", { frameWidth: 1400, frameHeight: 980 });
    };
    create() {
        this.background = this.add.image(400, 250, 'gameoverbk');
        this.background.setDisplaySize(1230, 600);
        this.reload = this.add.text(320, 250, '點擊重新開始', { font: "bold 30px TimeNewRome", fill: "black" });
        this.reload.setInteractive({ useHandCursor: true })
        .on('pointerdown', function () {
            this.scene.sound.play('choose');
            this.scene.scene.start("gameplay");
        })
        .on('pointerover', () => this.HoverState())
        .on('pointerout', () => this.RestState());
        this.ddd = this.add.text(150, 150, '你的分數為:', { font: "bold 50px TimeNewRome", fill: "black"});
        this.ddd.setText('你的分數為:' +' '+ this.finalScore+' '+'分');

        this.ddd = this.add.text(250, 50, '謝謝大家聆聽', { font: "bold 50px TimeNewRome", fill: "black"});
    };
    HoverState() {
        this.reload.setColor('red');
    };
    RestState() {
        this.reload.setColor('#balck');
    };

};

