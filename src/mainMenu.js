Game.MainMenu = function(game) {};

Game.MainMenu.prototype = {
    count : 0,
    create: function() { 
    
        isDay = true;
        
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
        
        playText = game.add.text(game.width/2, game.height/2 + 100, 'Start', {fill: deactiveFill});
        instructionsText = game.add.text(game.width/2 - 10, game.height/2 + 150, 'How to play', {fill: deactiveFill});
        playText.cssFont = "bold 50px Forte";
        instructionsText.cssFont = "bold 50px Forte";
        
        playText.anchor.setTo(0.5, 0.5);
        instructionsText.anchor.setTo(0.5, 0.5);
        playText.stroke = "#FFF";
        playText.strokeThickness = 5;
        playText.setShadow(0, 3, "#333333", 2, true, false);
        
        instructionsText.stroke = "#FFF";
        instructionsText.strokeThickness = 5;
        instructionsText.setShadow(0, 3, "#333333", 2, true, false);
        
        var timeOfDay = game.add.text(game.width/2 + 180, game.height/2 + 60, 'Time of Day', {font: 'bold 18px Arial', fill: activeFill, stroke: '#000', strokeThickness: 3});
        timeOfDay.anchor.setTo(0.5, 0.5);
        
        var afternoon = game.add.graphics(0, 0);
        afternoon.lineStyle(3, 0xefd539, 1);
        afternoon.beginFill(0xffde14, 1);
        afternoon.drawCircle(game.width/2 + 180, game.height/2 + 100, 50);
        
        var sunset = game.add.graphics(0, 0);
        sunset.lineStyle(3, 0xde8017, 1);
        sunset.beginFill(0xf1860e, 1);
        sunset.arc(game.width/2 + 180, game.height/2 + 110, 25, 0.08, 3.14, true); 
        sunset.visible = false;
        
        var timeOfDayButton = game.add.text(game.width/2 + 178, game.height/2 + 105, 'O');
        timeOfDayButton.inputEnabled = true;
        timeOfDayButton.fontSize= 50;
        timeOfDayButton.anchor.setTo(0.5, 0.5);
        timeOfDayButton.alpha = 0;
        
        timeOfDayButton.events.onInputDown.add(function(){
            isDay = !isDay;
            if (isDay) {
               // console.log('day');
                afternoon.visible = true;
                sunset.visible = false;
            } else {
               // console.log('sunset');
                afternoon.visible = false;
                sunset.visible = true;
            }
           // console.log(isDay);
        }, this);
        
              
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
        
        playText.inputEnabled = true;
        instructionsText.inputEnabled = true;
        
        playText.events.onInputDown.add(function(){
            game.state.start('PlayGame');
            Game.music.stop();
            black.alpha = 1;
        }, this);
        
        instructionsText.events.onInputDown.add(function(){ game.state.start('HowTo');}, this);
        
       
    }, 
    update: function() { 
        count = 5;
        dot.tilePosition.y -= Math.cos(count);
        dot.tilePosition.x -= Math.cos(count);
        
        // pointer
        if (playText.input.pointerOver()) {
            this.playTextActive();
        } else if (instructionsText.input.pointerOver()) {
            this.instructionsTextActive();
        }
        // space
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
