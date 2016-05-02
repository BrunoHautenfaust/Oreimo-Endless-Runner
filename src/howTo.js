Game.HowTo = {
    count : 0,
    create: function() { 
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        dot = game.add.tileSprite(0, 0, game.width, game.height, 'dot');
        var style = { font: "Bold 26px Arial", fill: "#3c3", align: "center", stroke: '#000', strokeThickness: 5};
       
        item = game.add.sprite(15,55,'item');
        item.scale.setTo(1.2,1.2);
        obstacle = game.add.sprite(70,180,'obstacle');
        obstacle.scale.setTo(0.4,0.4);
        
        mouse = game.add.sprite(100, game.height - 120, 'mouse');
        mouse.scale.setTo(0.6, 0.6);
        spaceButton = game.add.sprite(200, game.height - 100, 'space');
        spaceButton.scale.setTo(0.6, 0.6);
        tap = game.add.sprite(370, game.height - 120, 'tap');
        tap.scale.setTo(0.6, 0.6);
        
        text = game.add.text(20, 20,
        'Your goal is to collect as many\n     (eroge and anime DVDs) as you can.\n\nBut you also have to evade all \n(obstacles) in your way.\n\n', style);
        textInstr = game.add.text(100, game.height/2 + 40,
        'Jump over them with:', style);
        orText = game.add.text(150, game.height/2 + 100, 'or                      or', style);
        spaceText = game.add.text(221, game.height - 103, 'space');
       
        backText = game.add.text(game.width/2, game.height -40, 'Back');
        backText.cssFont  = "bold 50px Forte";
        backText.anchor.setTo(0.5, 0.5);
        backText.fill = "#093";
        backText.stroke = "#FFF";
        backText.strokeThickness = 5;
        backText.setShadow(0, 3, "#333333", 2, true, false);
        
        space.onDown.add(this.goBack, this);
        backText.inputEnabled = true;
        backText.events.onInputDown.add(function(){this.goBack();}, this);
    }, 
    update: function() { 
        count = 5;    
        dot.tilePosition.y -= Math.cos(count);
        dot.tilePosition.x -= Math.cos(count);
    },
    goBack() {
        game.state.start('MainMenu');
    }
};