Game.MainMenu = function(game) {};

Game.MainMenu.prototype = {
    count : 0,
    create: function() { 
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        up = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        down = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        dot = game.add.tileSprite(0, 0, game.width, game.height, 'dot');
        title = this.add.sprite(game.width/2, 105, 'title');
        title.anchor.setTo(0.5, 0.5);
        title.scale.setTo(1, 0.9);
        activeFill = "#093";
        deactiveFill = "#000";

        var titleText = game.add.text(game.width/2 + 6, game.height/2 - 5, 'My Little Sister Can\'t Run This Fast', {font: 'bold 13px Arial', fill: activeFill});
        titleText.anchor.setTo(0.5, 0.5);
        titleText.stroke = "#FFF";
        titleText.strokeThickness = 4;
        
        playText = game.add.text(game.width/2, game.height/2 + 50, 'Start', {fill: deactiveFill});
        instructionsText = game.add.text(game.width/2 - 10, game.height/2 + 120, 'How to play', {fill: deactiveFill});
        playText.cssFont  = "bold 50px Forte";
        instructionsText.cssFont  = "bold 50px Forte";
        
        playText.anchor.setTo(0.5, 0.5);
        instructionsText.anchor.setTo(0.5, 0.5);
        playText.stroke = "#FFF";
        playText.strokeThickness = 5;
        playText.setShadow(0, 3, "#333333", 2, true, false);
        
        instructionsText.stroke = "#FFF";
        instructionsText.strokeThickness = 5;
        instructionsText.setShadow(0, 3, "#333333", 2, true, false);
        
        down.onDown.add(this.instructionsTextActive, this); 
        up.onDown.add(this.playTextActive, this);
        
        playText.fill = activeFill;
     
        if (!Game.music || !Game.music.isPlaying) {
            
            Game.music = this.game.add.audio('menuMusic', 1, true);
            Game.music.play();
        }
        Game.music.onFadeComplete.add(function(){game.state.start('PlayGame');}, this);
      
        black = game.add.sprite(0,0, 'black');
        black.scale.setTo(game.width, game.height);
        black.alpha = 0;
    }, 
    update: function() { 
       
        count = 5;
        dot.tilePosition.y -= Math.cos(count);
        dot.tilePosition.x -= Math.cos(count);
        
        if (space.isDown && playText.fill == activeFill) {
            Game.music.fadeOut(400);
            black.alpha = 1;
            } else if (space.isDown && instructionsText.fill == activeFill) {
                game.state.start('HowTo');
            }
    },
    instructionsTextActive() {
        playText.fill = deactiveFill;
        instructionsText.fill = activeFill;
    },
    playTextActive() {
        playText.fill = activeFill;
        instructionsText.fill = deactiveFill;
    }
};
