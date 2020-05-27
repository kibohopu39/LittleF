class NormalZombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'zombie');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('zombie_walk1');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, 428, 100);
        this.dir = direction;
        this.type = 1;
    };
    update() {
        this.hp.edditPosition(this);
    };
};
class NormalZombie2 extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'zombie2');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('zombie_walk2');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, 428, 100);
        this.dir = direction;
        this.type = 1;
    }
    update() {
        this.hp.edditPosition(this);
    };
};
class FlagZombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'flagzom');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('flag_zom');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, y, 125);
        this.dir = direction;
        this.type = 2;
    };
    update() {
        this.hp.edditPosition(this);
    };
};
class AngryZombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'angryzom');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('angry_zom');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, y, 125);
        this.dir = direction;
        this.type = 3;
    };
    update() {
        this.hp.edditPosition(this);
    };
};
class DanceZombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'dancezom');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('dance_zom');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, y, 150);
        this.dir = direction;
        this.type = 4;
    };
    update() {
        this.hp.edditPosition(this);
    };
};
class SoccerZombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, 'soccerzom');
        scene.enemy.add(this);
        scene.add.existing(this);
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        this.play('soccer_zom');
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        scene.physics.add.overlap(this, scene.projectiles);
        this.setScale(0.6);
        this.setSize(-1, 191, 1);
        this.angle += -6;
        this.hp = new HealthBar(scene, x, y, 175);
        this.dir = direction;
        this.type = 5;
    };
    update() {
        this.hp.edditPosition(this);
    };
};
class NEnemyDie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "Z_die");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('zombie_die');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class DanceDie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "dancedie");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('dance_die');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class SoccerDie extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "soccerdie");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('soccer_die');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class NEnemyDie_head extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "ZsHead");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('zombie_head');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class AngryDie_head extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "angryHead");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('angryHead');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class DanceDie_head extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, direction) {
        super(scene, x, y, "danceHead");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.add.existing(this);
        this.play('danceHead');
        this.setScale(0.6);
        this.angle += -6;
        this.dir = 1;
    };
};
class HealthBar {
    constructor(scene, x, y, MaxHP) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = x;
        this.y = y - 58;
        this.maxhp = MaxHP;
        this.value = MaxHP;
        this.p = 36 / MaxHP;
        this.draw();
        scene.add.existing(this.bar);
    };
    edditPosition(zombie) {//change position 
        if (zombie.active) {
            this.x = zombie.x - 23;
            this.y = zombie.y - 55;
            this.draw();
        } else {
            this.bar.clear();
        }
    };
    getMaxHP(amount) {
        if (amount) {
            return this.maxhp
        }else{
            return -(this.maxhp)
        }
    }
    decrease(amount) {
        this.value -= amount;
        if (this.value < 0) {
            this.value = 0;
        }
        this.draw();
        return (this.value === 0);
    };
    draw() {
        this.bar.clear();
        //  Healthbar_Background
        this.bar.fillStyle(0x000000);
        this.bar.fillRect(this.x, this.y, 40, 16);
        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 36, 12);
        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);//turn red
        } else {
            this.bar.fillStyle(0x00ff00);//else => green
        }
        var d = Math.floor(this.p * this.value);//life point
        this.bar.fillRect(this.x + 2, this.y + 2, d, 12);
    };
};