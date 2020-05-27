class LFZGame extends Phaser.Scene {
    constructor() {
        super('gameplay');
    };
    create() {
        this.music2 = this.sound.add('gamebg');
        this.music2.play();
        this.music2.setVolume(0.1);
        // background and plate
        this.background = this.add.tileSprite(400, 250, 800, 500, 'background')
        this.footer = this.add.tileSprite(0, 484, 3366, 32, 'footer')
        this.physics.add.existing(this.footer);
        this.footer.body.immovable = true;
        this.footer.body.moves = false;
        // text
        this.initialTime = gameSettings.countdown;
        this.text = this.add.text(550, 32, '剩餘時間: ' + this.formatTime(this.initialTime), { font: "bold 30px Arial", fill: "yellow" });
        this.scoreText = this.add.text(20, 20, "分數:", { font: "bold 40px Arial", fill: "yellow" })
        // this.pausetext = this.add.text(550, 80, '遊戲狀態:',{ font: "bold 20px Arial", fill: "black" });
        // this.pausetext2 = this.add.text(650, 80, '進行中..',{ font: "bold 20px Arial", fill: "black" });
        this.score = 0;
        this.HP = this.add.text(15, 100, "血量", { font: "bold 25px Arial", fill: "black" })
        // object_group
        this.platforms = this.physics.add.staticGroup();//_plates
        this.projectiles = this.physics.add.group();//_balls
        this.enemy = this.add.group();//_zombies
        // enemy from right
        this.zombie1 = new NormalZombie(this, 670, 428, 1);
        this.zombie3 = new NormalZombie2(this, 775, 428, 1);
        this.zombie5 = new FlagZombie(this, 800, 428, 1);
        this.zombie7 = new AngryZombie(this, 1370, 428, 1);
        this.zombie9 = new DanceZombie(this, 1170, 428, 1);
        this.zombie11 = new SoccerZombie(this, 1500, 428, 1);
        //enemy from left
        this.zombie2 = new NormalZombie(this, 200, 428, -1);
        this.zombie4 = new NormalZombie2(this, 100, 428, -1);
        this.zombie6 = new FlagZombie(this, 10, 428, -1);
        this.zombie8 = new AngryZombie(this, -60, 428, -1)
        this.zombie10 = new DanceZombie(this, -750, 428, -1);
        this.zombie12 = new SoccerZombie(this, -1500, 428, -1);
        // player
        this.player = new Dennis(this, 400, 28);
        // music
        this.sfx = {
            ball: this.sound.add('bullets'),
            ball_explode: this.sound.add('explode'),
            jump: this.sound.add('jump'),
            hit: this.sound.add('hit'),
            NZdie: this.sound.add('NZdie'),
            Playerdie: this.sound.add('playerdie'),
            pass: this.sound.add('timesup'),
        };
        // collide
        this.physics.add.collider(this.player, this.footer); //角色與地板相撞
        this.player.setCollideWorldBounds(true); //角色邊界限制
        // overlap
        this.physics.add.overlap(this.enemy, this.projectiles, this.hitEnemy, null, this);
        this.physics.add.overlap(this.player, this.enemy, this.hurtPlayer, null, this);
        // 監聽鍵盤
        this.cursorkeys = this.input.keyboard.createCursorKeys();
        this.shoot = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.S_hunKick = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        // TimeEvent
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.onEvent, callbackScope: this, loop: true });
        // pause and resume the game
    //     this.pausetext2.setInteractive()
    //     .on('pointerdown', function () {
    //         if (this.scene.scene.isPaused('gameplay')) {
    //             this.scene.scene.resume('gameplay');   
    //             this.scene.pausetext2.setText('進行中');   
    //         } else {
    //             this.scene.pausetext2.setText('暫停');
    //             this.scene.scene.pause('gameplay');
    //             console.log(this.scene.scene.Active)      
    //         }
            
    //     })
    //     .on('pointerover', () => this.Hover())
    //     .on('pointerout', () => this.Rest());

    };
    //殭屍移動函式
    moveZombie(zombie, speed) {
        zombie.update();//移動血量條
        if (zombie.dir == 1) {
            zombie.x -= speed;
            if (zombie.x < 0) {
                this.resetZPosition(zombie);
            }
        } else if (zombie.dir == -1) {
            zombie.x += speed;
            if (zombie.x > config.width) {
                this.resetZPosition(zombie);
            }
        };
    };
    // 殭屍走到畫面邊緣，從另一側回到螢幕上
    resetZPosition(zombie) {
        if (zombie.dir == 1) {
            zombie.x = 820;
            // var randomZtype = Phaser.Math.Between(1, 2);
        } else if (zombie.dir == -1) {
            zombie.x = 0;
        };
    };
    // 殭屍死掉，把它回滿血，隨機從天而降
    rebornZom(zombie) {
        if (zombie.dir == 1) {
            var randomX = Phaser.Math.Between(600, 1300);
            zombie.x = randomX;
            zombie.y = 10
            var relife=zombie.hp.getMaxHP(-1);
            zombie.hp.decrease(-relife);
        } else if (zombie.dir == -1) {
            var randomX = Phaser.Math.Between(-1400, 375);
            zombie.x = randomX;
            zombie.y = 10
            var relife=zombie.hp.getMaxHP(-1);
            zombie.hp.decrease(-relife);
        };
    };
    shootball(direction) {//氣功波
        var dennisball = new DennisBall(this, direction);
    };
    hurtPlayer(player) {
        if (player.hp.value == 0) {
            this.playerdie();
        } else {
            player.hp.decrease(1);
        };
    };
    zombiegethit(zombie, dennisball) {
        zombie.hp.decrease(25);
        if (zombie.hp.value != 0) {
            if (this.player.dir == 1) {
                zombie.x += 20;
            } else {
                zombie.x -= 20;
            }
        } else {
            this.score += 15; //record score
            this.scoreText.setText(`Score:` + this.score);
            //zombie reset
            this.rebornZom(zombie);
            this.sfx.NZdie.play();
            if (zombie.type == 3) {
                var zombiedie = new NEnemyDie(this, dennisball.x, dennisball.y, zombie.dir);
                var zombiedieH = new AngryDie_head(this, dennisball.x, dennisball.y, zombie.dir);
            } else if (zombie.type == 4) {
                var zombiedie = new DanceDie(this, dennisball.x, dennisball.y, zombie.dir);
                var zombiedieH = new DanceDie_head(this, dennisball.x, dennisball.y, zombie.dir);
            } else if (zombie.type == 5) {
                var zombiedie = new SoccerDie(this, dennisball.x, dennisball.y, zombie.dir);
                var zombiedieH = new NEnemyDie_head(this, dennisball.x, dennisball.y, zombie.dir);
            } else {
                var zombiedie = new NEnemyDie(this, dennisball.x, dennisball.y, zombie.dir);
                var zombiedieH = new NEnemyDie_head(this, dennisball.x, dennisball.y, zombie.dir);
            };
        };
    };
    hitEnemy(enemy, dennisball) {
        this.zombiegethit(enemy, dennisball);
        var ball = this.projectiles.getChildren()[0]
        //sound effect
        this.sfx.hit.play();
        this.sfx.ball_explode.play();
        //ball explode and disappear
        // ball.explosion(this);
        dennisball.destroy();
    };
    onEvent() {
        this.initialTime -= 1; // One second
        if (this.initialTime != 0) {
            this.text.setText('剩餘時間: ' + this.formatTime(this.initialTime));
        } else {
            this.scene.start("gameover",[this.score]);
            this.music2.stop();
            this.sound.play('timesup');
        };
    };
    formatTime(seconds) {
        var minutes = Math.floor(seconds / 60); // Minutes
        // Seconds
        var partInSeconds = seconds % 60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2, '0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
    };
    playerdie() {
        this.physics.pause();
        this.scene.start("gameover",[this.score]);
        this.music2.stop();
        this.sound.play('playerdie');
    };
    Hover() {
        this.pausetext2.setColor('red');
    };
    Rest() {
        this.pausetext2.setColor('black');
    };

    update() {
        // come from right
        this.moveZombie(this.zombie1, 0.2);
        this.moveZombie(this.zombie3, 0.3);
        this.moveZombie(this.zombie5, 0.4);
        this.moveZombie(this.zombie7, 0.5);
        this.moveZombie(this.zombie9, 0.6);
        this.moveZombie(this.zombie11, 0.9);
        //come from left
        this.moveZombie(this.zombie2, 0.2);
        this.moveZombie(this.zombie4, 0.3);
        this.moveZombie(this.zombie6, 0.4);
        this.moveZombie(this.zombie8, 0.5);
        this.moveZombie(this.zombie10, 0.6);
        this.moveZombie(this.zombie12, 0.9);

        if (Phaser.Input.Keyboard.JustDown(this.shoot)) {//shoot ball
            if (this.player.body.touching.down && this.player.anims.getCurrentKey() == 'standing') {
                this.shootball(this.player.dir);
                this.sfx.ball.play();
                this.player.setVelocityX(0);
                // for (var i = 0; i < this.projectiles.getChildren().length; i++) {
                //     var ball = this.projectiles.getChildren()[i];
                //     ball.up();
                // }
                this.player.anims.play('S_hadouken', true).on('animationcomplete', () => {
                    this.player.anims.play('standing', true)
                });
            } else { };
        };
        //按百烈腿
        if (Phaser.Input.Keyboard.JustDown(this.S_hunKick) && this.player.body.touching.down) {
            this.player.setVelocityX(10);
            this.player.anims.play('S_hunKick', true).on('animationcomplete', () => {
                this.player.anims.play('standing', true)
            });
        }
        this.movePlayerManager();
        ////////////////////////////
        // 改進的空間////////////////
        ////////////////////////////
        // 設定跑步的按法...之類
        // this.input.keyboard.createCombo([39, 39], {
        //     resetOnWrongKey: true,
        //     maxKeyDelay: 0.5,
        //     resetOnMatch: true,
        //     deleteOnMatch: true,
        // });
    };

    movePlayerManager() {
        if (this.cursorkeys.right.isDown) {
            switch (this.player.body.touching.down) {
                case true:
                    this.player.setVelocityX(gameSettings.player_XSpeed);
                    this.player.setSize(60, 80, 0);
                    this.player.anims.play('walk', true);
                    this.player.flipX = false;
                    this.player.dir = 1;
                    break;
                default:
                    this.player.setVelocityX(gameSettings.player_XSpeed);
                    this.player.setSize(60, 80, 0);
                    this.player.flipX = false;
                    this.player.dir = 1;
            };
            //接觸地面的同時，持續按左鍵，走路移動；不在地面時持續按左鍵，移動
        } else if (this.cursorkeys.left.isDown) {
            switch (this.player.body.touching.down) {
                case true:
                    this.player.setVelocityX(-(gameSettings.player_XSpeed));
                    this.player.setSize(60, 80, 0);
                    this.player.anims.play('walk', true);
                    // 是否將圖鏡像
                    this.player.flipX = true;
                    this.player.dir = -1;
                    break;
                default:
                    this.player.setVelocityX(-(gameSettings.player_XSpeed));
                    this.player.setSize(60, 80, 0);
                    this.player.flipX = true;
                    this.player.dir = -1;
            }
            // 不動跳落地:XY軸速度為0，貼地
            // 左右鍵提起:播放站立以外的動畫，播完換站立
            // 技能後:正在播站立以外的動畫
            // 不按任意鍵
        } else if (this.player.body.touching.down) {
            //不在招式動畫時
            if (this.player.anims.getCurrentKey() != 'S_hadouken' && this.player.anims.getCurrentKey() != 'S_hunKick') {
                this.player.setVelocityX(0);
                this.player.setSize(60, 80, 0);
                this.player.anims.play('standing', true);
            } else { };
        }
        if (Phaser.Input.Keyboard.JustDown(this.cursorkeys.up)) { // 按上
            this.sfx.jump.play();
            if (this.player.body.touching.down) {
                this.player.setVelocityY(gameSettings.player_YSpeed);
            } else {
                this.player.anims.play('Njump', true);
            };
            //空中時
        } else if (this.player.VelocityY != 0) {
            if (!this.player.body.touching.down) {
                this.player.anims.play('Njump', true);
            };
        };
    };
};
