Game.Preload = {
    preload: function(){ 
        var loadingBar = this.add.sprite(game.world.centerX, game.world.centerY, "loading");
        game.load.setPreloadSprite(loadingBar);
        loadingBar.anchor.setTo(0.5,0.5);
        loadingBar.scale.setTo(1,0.4);
        
        // Main Menu
        game.load.image('title', 'assets/textures/title.png');
        game.load.image('dot', 'assets/textures/dot.png');
        game.load.audio('menuMusic', 'assets/audio/menuMusic.ogg');
        
        // How to
        game.load.image('obstacle', 'assets/textures/crate.png');
        game.load.image('item', 'assets/textures/item.png');
        game.load.image('space', 'assets/textures/space.png');
        game.load.image('mouse', 'assets/textures/mouse.png');
        game.load.image('tap', 'assets/textures/tap.png');
        
        // Main Game
        game.load.image('sky', 'assets/textures/sky.jpg');
        game.load.image('sun', 'assets/textures/sun.png');
        game.load.image('cloudsTop', 'assets/textures/city/clouds_top.png');
        game.load.image('cloudsBottom', 'assets/textures/city/clouds_bottom.png');
        game.load.image('mountain', 'assets/textures/city/mountain.png');
        game.load.image('smallMountains', 'assets/textures/city/small_mountains.png');
        game.load.image('cityBack', 'assets/textures/city/city_back.png');
        game.load.image('cityMid', 'assets/textures/city/city_mid.png');
        game.load.image('cityFront', 'assets/textures/city/city_front.png');
        game.load.image('filter', 'assets/textures/city/filter.png');
        game.load.image('black', 'assets/textures/black.png');
        game.load.image('ground', 'assets/textures/ground.png');
        game.load.image('grass', 'assets/textures/grass.png');
        game.load.atlas('atlas', 'assets/textures/spritesheet.png', 'assets/textures/spritesheet.json');
        game.load.image('rectangle', 'assets/textures/rectangle.png');
        game.load.audio('jump1', 'assets/audio/jump1.wav');
        game.load.audio('jump2', 'assets/audio/jump2.wav');
        game.load.audio('stageMusic', 'assets/audio/stageMusic.ogg');
        game.load.audio('itemSound','assets/audio/item.ogg');
        
        game.load.image('point','assets/textures/point.jpg');
        game.load.spritesheet('sparkle','assets/textures/sparkle.png', 60, 62);
	},
  	create: function(){
		this.game.state.start("MainMenu");
    }
};