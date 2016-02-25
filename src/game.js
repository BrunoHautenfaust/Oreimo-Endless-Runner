var game = new Phaser.Game(512, 400, Phaser.AUTO, 'phaser-game');

game.state.add('Boot', Game.Boot);
game.state.add('Preload', Game.Preload);
game.state.add('MainMenu', Game.MainMenu);
game.state.add('HowTo', Game.HowTo);
game.state.add('PlayGame', Game.MainState);

game.state.start('Boot');