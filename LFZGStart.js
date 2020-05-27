class LFZGStart extends Phaser.Scene {
    constructor() {
        super("bootgame");
    }
    preload() {
        this.load.spritesheet('zombie', "/Zombie/zombie_walk.png", { frameWidth: 166, frameHeight: 144 });
        this.load.spritesheet('zombie2', "/Zombie/zombie_walk2.png", { frameWidth: 166, frameHeight: 144 });
        this.load.spritesheet('flagzom', "/Zombie/flag_zombie.png", { frameWidth: 166, frameHeight: 144 });
        this.load.spritesheet('ZsHead', "/Zombie/zombie_head.png", { frameWidth: 150, frameHeight: 186 });
        this.load.spritesheet('Z_die', "/Zombie/zombie_die.png", { frameWidth: 166, frameHeight: 144 });
        this.load.spritesheet('angryzom', "/Zombie/angry_zombie.png", { frameWidth: 216, frameHeight: 164 });
        this.load.spritesheet('angryHead', "/Zombie/angry_die.png", { frameWidth: 216, frameHeight: 164 });
        this.load.spritesheet('dancezom', "/Zombie/dance_zombie.png", { frameWidth: 126, frameHeight: 152 });
        this.load.spritesheet('dancedie', "/Zombie/dance_die.png", { frameWidth: 210, frameHeight: 155 });
        this.load.spritesheet('danceHead', "/Zombie/dance_head.png", { frameWidth: 134, frameHeight: 172 });
        this.load.spritesheet('soccerzom', "/Zombie/soccer_zombie.png", { frameWidth: 156, frameHeight: 160 });
        this.load.spritesheet('soccerdie', "/Zombie/soccer_die.png", { frameWidth: 236, frameHeight: 170 });
        this.load.spritesheet('dennis_0', "/dennis/dennis_0.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dennis_2', "/dennis/dennis_2.png", { frameWidth: 80, frameHeight: 80 });
        this.load.spritesheet('dennis_ball', "/dennis/dennis_ball.png", { frameWidth: 81, frameHeight: 46 });
        this.load.image('footer', "/assets/platform.png", { frameWidth: 142, frameHeight: 32 });
        this.load.image('background', "/assets/background.png", { frameWidth: 800, frameHeight: 500 });
        this.load.audio('hit', "/data/001.wav");
        this.load.audio('jump', "/data/017.wav");
        this.load.audio('explode', "/data/020.wav");
        this.load.audio('bullets', "/data/046.wav");
        this.load.audio('NZdie', "/data/173.wav");
        this.load.audio('playerdie', "/data/228.wav");
        this.load.audio('timesup', "/data/m_pass.wav");
        this.load.audio('gamebg', "/data/music010_stage.ogg");
    };
    create() {
        this.add.text(520, 420, 'Loading...', { font: "bold 40px TimeNewRome", fill: "yellow" });
        this.anims.create({//zombie1_walk
            key: 'zombie_walk1',
            frames: this.anims.generateFrameNumbers('zombie', { start: 0, end: 21 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie1_walk2
            key: 'zombie_walk2',
            frames: this.anims.generateFrameNumbers('zombie2', { start: 0, end: 30 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie2_hold_flag
            key: 'flag_zom',
            frames: this.anims.generateFrameNumbers('flagzom', { start: 0, end: 11 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie3_angry
            key: 'angry_zom',
            frames: this.anims.generateFrameNumbers('angryzom', { start: 0, end: 13 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie4_dance
            key: 'dance_zom',
            frames: this.anims.generateFrameNumbers('dancezom', { start: 0, end: 27 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie5_dance
            key: 'soccer_zom',
            frames: this.anims.generateFrameNumbers('soccerzom', { start: 0, end: 10 }),
            repeat: -1,
            frameRate: 12,
        });
        this.anims.create({//zombie1_head_drop
            key: 'zombie_head',
            frames: this.anims.generateFrameNumbers('ZsHead', { start: 0, end: 11 }),
            repeat: 0,
            frameRate: 12,
            hideOnComplete: true,
        });
        this.anims.create({//zombie1_die
            key: 'zombie_die',
            frames: this.anims.generateFrameNumbers('Z_die', { start: 0, end: 9 }),
            repeat: 0,
            frameRate: 10,
            hideOnComplete: true,
        });
        this.anims.create({//angryHead_drop
            key: 'angryHead',
            frames: this.anims.generateFrameNumbers('angryHead', { start: 0, end: 9 }),
            repeat: 0,
            frameRate: 10,
            hideOnComplete: true,
        });
        this.anims.create({//dance_die
            key: 'dance_die',
            frames: this.anims.generateFrameNumbers('dancedie', { start: 0, end: 19 }),
            repeat: 0,
            frameRate: 10,
            hideOnComplete: true,
        });
        this.anims.create({//danceHead_drop
            key: 'danceHead',
            frames: this.anims.generateFrameNumbers('danceHead', { start: 0, end: 7 }),
            repeat: 0,
            frameRate: 10,
            hideOnComplete: true,
        });
        this.anims.create({//soccer_die
            key: 'soccer_die',
            frames: this.anims.generateFrameNumbers('soccerdie', { start: 0, end: 6 }),
            repeat: 0,
            frameRate: 10,
            hideOnComplete: true,
        });
        this.anims.create({//player standing
            key: 'standing',
            frames: this.anims.generateFrameNumbers('dennis_0', { frames: [0, 1, 2, 3, 2, 1] }),
            repeat: -1,
            frameRate: 4,
        });
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('dennis_0', { frames: [4, 5, 6, 7, 6, 5] }),
            repeat: 0,
            frameRate: 8,
        });
        this.anims.create({
            key: 'Njump',
            frames: this.anims.generateFrameNumbers('dennis_0', { frames: [62] }),
            repeat: 1,
            frameRate: 8,
        });
        this.anims.create({ // 氣功波動畫
            key: 'ball',
            frames: this.anims.generateFrameNumbers('dennis_ball', { frames: [0, 1, 8, 9, 12, 13, 2, 10, 14, 3, 11, 15] }),
            repeat: -1,
            frameRate: 6,
        });
        this.anims.create({ // 氣功波爆炸
            key: 'ball_break',
            frames: this.anims.generateFrameNumbers('dennis_ball', { frames: [5, 6, 7, 8] }),
            repeat: 0,
            frameRate: 12,
            hideOnComplete: true
        });
        this.anims.create({ // 角色發射氣功波動作
            key: 'S_hadouken',
            frames: this.anims.generateFrameNumbers('dennis_2', { start: 0, end: 6 }),
            repeat: 0,
            frameRate: 12,
        });
        this.anims.create({ // 角色百列腿動作
            key: 'S_hunKick',
            frames: this.anims.generateFrameNumbers('dennis_2', { frames: [22, 23, 24, 25, 26, 27, 28, 29, 39, 38] }),
            repeat: 0,
            frameRate: 8,
        });
        this.time.addEvent({
            delay: 10000,
            callback: this.StartGame(),
            loop: false,
        });
    };
    StartGame() {
        this.scene.start("gameplay")
    };
};
