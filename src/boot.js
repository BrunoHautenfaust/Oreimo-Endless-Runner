Game = {
    music: null
};

//Game.Boot = function(game) {};

Game.Boot = {
    preload: function(){
        game.load.image('loading', 'assets/textures/rectangle.png'); 
	},
  	create: function(){
        game.stage.backgroundColor = '#FEF9B9';
		this.scale.pageAlignHorizontally = true;
		this.game.state.start("Preload");
	}
};