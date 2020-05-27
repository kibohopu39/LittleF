class Dennis extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'dennis_0');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.physics.add.collider(this, scene.footer);
        this.setSize(100, 76, 1);
        this.dir = 1;
        this.hp = new PHealthBar(scene, x, y);
    };
};
class DennisBall extends Phaser.GameObjects.Sprite {
    constructor(scene, direction) {
        var x = scene.player.x;
        var y = scene.player.y;
        super(scene, x, y, "dennisball");
        if (direction == -1) {
            this.flipX = true;
        } else {
            this.flipX = false;
        };
        scene.projectiles.add(this);
        scene.add.existing(this);
        this.play('ball');
        scene.physics.world.enableBody(this);
        this.body.velocity.x = direction * gameSettings.ball_XSpeed;
        this.body.gravity.y = -1500;
    };
    up() {
        if (this.x > 300 | this.x < 0) {
            this.destroy();
        };
    };
};
class PHealthBar {
    constructor(scene) {
        this.bar = new Phaser.GameObjects.Graphics(scene);
        this.x = 28;
        this.y = 140;
        this.value = 120;
        this.p = 96 / 120;
        this.draw();
        scene.add.existing(this.bar);
    };
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
        this.bar.fillRect(this.x, this.y, 20, 100);
        //  Health
        this.bar.fillStyle(0xffffff);
        this.bar.fillRect(this.x + 2, this.y + 2, 16, 96);
        if (this.value < 30) {
            this.bar.fillStyle(0xff0000);//turn red
        } else {
            this.bar.fillStyle(0x00ff00);//else => green
        }
        var d = Math.floor(this.p * this.value);//life point
        this.bar.fillRect(this.x + 2, this.y + 2, 16, d);
    };
};