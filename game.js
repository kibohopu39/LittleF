const config = {
    type: Phaser.AUTO,
    //設定畫布大小
    width: 800,
    height: 500,
    parent: 'screen',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1500,
            },
            debug: false
        },
    },
    backgroundColor: 0x000000,
    scene: [LFZGMenu, LFZGStart, LFZGame, LFZGOver]
}
var gameSettings = {
    player_XSpeed: 200,
    player_YSpeed: -630,
    ball_XSpeed: 400,
    countdown: 60,
};
const game = new Phaser.Game(config);
