//Game.MainState = function(game) {};

var universalTimer,
    sky,
    rdg,
    ranNum,
	player,
    ground,
    platforms,
    obstacleSprite,
    obstacles,
    item,
    items,
    obstacleTime = -1,
    jumptimer = 0,
    playerControl = false,
    flag = 0,
    pass = 0,
    anmSpeed,
    speed,
    grassSpeed = 0,
    cityBackSpeed = 0.015,
    cityMidSpeed = 0.020,
    cityFrontSpeed = 0.030,
    timeCheck = 0,
    passText,
    scoreText,
    topScore = 0,
    score = 0,
    playerInPosition = false,
    numArr = [700, 1200, 2000],
    soundArray = [],
    stageMusic,
    itemTimer = -1,
    itemPlace = [150, 300, 200],
    itemFlag,
    ranItemPlace,
   // isDay = false,
    tint = 0xffbf99,
    gameOver = false,
    gameOverCounter = 0;

Game.MainState = {
   
	create() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
       
        sky = game.make.sprite(0,0, 'sky');
        cityBack = game.make.sprite(0,0, 'cityBack');
        cityMid = game.make.sprite(0,0, 'cityMid');
        cityFront = game.make.sprite(0,0, 'cityFront');
        groundSprite = game.make.sprite(0, 0, 'ground');
        obstacleSprite = game.make.sprite(0, 0, 'obstacle');
        grass = game.make.sprite(0, 0, 'grass');
        item = game.make.sprite(0, 0, 'item'); 
      
        sky = game.add.sprite(0,0,'sky');
        mountain = game.add.sprite(game.world.width/2 - 120, game.height/2 - 30, 'mountain');

        cloudsTop = game.add.sprite(game.world.width/2 + 60, game.world.height/2 - 5, 'cloudsTop');
        cloudsBottom = game.add.sprite(game.world.width/2 + 10, game.world.height/2 + 5, 'cloudsBottom');
        smallMountains = game.add.sprite(0, game.world.height/2 + 5, 'smallMountains');
        smallMountains.width = game.width;
        cityBack = game.add.tileSprite(0, game.world.height/2 + 10, game.world.width, cityBack.height, 'cityBack');
        cityMid = game.add.tileSprite(0, game.world.height/2 + 30, game.world.width, cityMid.height, 'cityMid');
        cityFront = game.add.tileSprite(0, game.world.height/2 +5, game.world.width, cityFront.height, 'cityFront');
        filter = game.add.sprite(0,0, 'filter');
        filter.scale.setTo(game.width, game.height);
        filter.alpha = 0.15;
        
        //graphics.beginFill(0xFFFFFF, 1);
        //graphics.drawCircle(-5, -5, 2); // draws a circle in the given coordinates
        //game.add.sprite(-10, 150, texture); // starts the trailing from the given coordinates

        platforms = game.add.group();
        platforms.enableBody = true;
        
        ground = platforms.create(-150, game.world.height-groundSprite.height, 'ground');
        ground.body.immovable = true;
        
        grass = game.add.tileSprite(0, game.height - 52, game.world.width, grass.height, 'grass');
        platforms.add(grass);   // This makes the grass become part of the group and obstacles appear IN FRONT (second group)
        
        item.scale.setTo(20,20);
        items = game.add.group();
        items.createMultiple(10, 'item');

        itemSound = game.add.audio('itemSound');
         
        obstacles = game.add.group();
        obstacles.enableBody = true;
        obstacles.createMultiple(10, 'obstacle');
        platforms.add(obstacles);

        player = game.add.sprite(0, 0, 'atlas');
        game.physics.arcade.enable(player);
        player.scale.setTo(0.5, 0.5);
        player.x = -275;
        player.y = 68;
        player.body.gravity.y = 1500;
        
        space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        pointer = game.input.activePointer;
        game.input.enabled = false;

        topScore = localStorage.getItem("HighScore") == null ? 0 : localStorage.getItem("HighScore");

        var style = { font: "Bold 28px Arial", fill: "#FFF"};
        scoreText = game.add.text(10, 35, 'score: 0', style);
        topScoreText = game.add.text(10, 5, 'top score: ' + topScore, style);
        
        black = game.add.sprite(0,0, 'black');
        black.scale.setTo(game.width, game.height);
        black.alpha = 0;

        rdg = new Phaser.RandomDataGenerator();
        
        player.animations.add('run', Phaser.Animation.generateFrameNames('K', 9, 14));
        player.animations.add('goUp', Phaser.Animation.generateFrameNames('K', 2, 6));
        player.animations.add('inAir', Phaser.Animation.generateFrameNames('K', 7, 8));
        player.animations.add('goDown', Phaser.Animation.generateFrameNames('K', 1, 6).reverse());
        
       var jump1 = game.add.audio('jump1');
       var jump2 = game.add.audio('jump2');
       soundArray = [jump1, jump2];
       stageMusic = game.add.audio('stageMusic', 1, true);
       stageMusic.play();
        
       rectangle = game.make.sprite(0,0,'rectangle');
       rectangle = game.add.sprite(game.world.centerX - rectangle.width/2, game.world.centerY - rectangle.height + 20,'rectangle');
        rectangle.scale.y = 1.5;
       // rectangle.anchor.setTo(0.5, 0.5);
        var style2 = { fontSize: '22px', fill: '#093' }
        topScoreTextInRect = game.add.text(game.world.centerX - rectangle.width/2 + 10, game.world.centerY - rectangle.height/2 + 6,'top score: 0', style2);
        scoreTextInRect = game.add.text(game.world.centerX - rectangle.width/2 + 10, game.world.centerY - rectangle.height/2 + 30, 'score: 0', style2);
        
        playAgainText = game.add.text(game.world.centerX - rectangle.width/2 + 32, game.world.centerY - rectangle.height/2 + 60, 'Play again', {fill: '#093', stroke: '#FFF', strokeThickness: 5});
       
        mainMenuText = game.add.text(game.world.centerX - rectangle.width/2 + 30, game.world.centerY - rectangle.height/2 + 100, 'Main Menu', {fill: '#093', stroke: '#FFF', strokeThickness: 5});

        rectangle.alpha = 0;
        topScoreTextInRect.alpha = 0;
        scoreTextInRect.alpha = 0;
        playAgainText.alpha = 0;
        mainMenuText.alpha = 0;
        
       var cloudTint = 0xa998a0;
          // new
         if (!isDay) {
            sky.tint = 0xeeb8b5;
            mountain.tint = 0xeeb8b5;
            cloudsTop.tint = cloudTint;
            cloudsBottom.tint = cloudTint;
            smallMountains.tint = tint;
            //point.tint = tint;
            cityBack.tint = tint;
            cityMid.tint = tint;
            cityFront.tint = tint;
            grass.tint = tint;
            player.tint = tint;
            filter.tint = 0xfdafe0;
             
            this.SunsetGradient();
            /*
            sun = game.add.sprite(game.width - 40, game.height - 160,'sun');
            sun.scale.setTo(0.4,0.4);
            sun.anchor.setTo(0.5, 0.5);
            */
        } else {
            sun = game.add.sprite(game.width - 50, 100,'sun');
            sun.scale.setTo(0.4,0.4);
            sun.anchor.setTo(0.5, 0.5);
        }
        
         // plane
        /*
        a = 1;
        point = game.make.sprite(0, 0, 'point');
        texture = game.add.renderTexture(100, 100, 'planetrail');
        */
        
        universalTimer = game.time.create(false);
        universalTimer.start();
        
        game.onBlur.add(function(){
            universalTimer.pause();
            game.paused = true;
            game.sound.pauseAll();
            black.alpha = 0.5;
        }, this);
        
        game.onFocus.add(function(){
           // if (!gameOver) {    // I think this fixes kill items/obs reoccur after game over
            universalTimer.resume();
            game.paused = false;
            game.sound.resumeAll();
            black.alpha = 0;
           //     }
        }, this);
        
      
    },
   
	update() {
       var inputName = $('#input');
        ShowHideInput(inputName);
        
       // texture.renderXY(point, a+=1, 0);
        
        if (!gameOver) {
            this.checkIfPlayerOnTop();
            
            this.playerAppear();
            this.paralax();
            grass.tilePosition.x -= grassSpeed;
            ranNum = rdg.pick(numArr);
            ranItemPlace = rdg.pick(itemPlace);
            
            
            this.setBodySize();
            this.playerJump();
            var ranSnd = rdg.pick(soundArray);
            this.playRandomSound(ranSnd);

            this.startObstacleAndItemTimer();
            this.updateSpeedForAliveElements();
            this.raiseDifficulty();

            this.checkObstacleItemOverlap();
            this.itemTaken();
            
            this.gameOver();
        } else {
            this.CheckOption();
            console.log('checking option');
        }
        
	},
    render() {
        //game.debug.body(player);
    },
    updateSpeedForAliveElements: function() {   // !
            console.log('updateSpeedForAliveElements running');
          obstacles.forEachAlive(function(o){
                o.body.velocity.x = speed;
            }, this);

            items.forEachAlive(function(i) {
                i.body.velocity.x = speed;
            }, this);  
    },
    startObstacleAndItemTimer: function() { // !
            if (playerInPosition) {

                 if (universalTimer.ms > obstacleTime) {
                    obstacleTime = universalTimer.ms + ranNum + 100;
                    this.addObstacle();
                 }
                 if (universalTimer.ms > itemTimer) {
                    itemTimer = universalTimer.ms + ranNum;
                    universalTimer.loop(itemTimer, this.addItem, this);
                 }
             }
        // code ensures that no more obstacles/items will be added:
       
          //   universalTimer.destroy();
          //   console.log('dead');
    },
    run: function(s) {
        player.animations.play('run', s, true); 
    },
    setBodySize: function() {
       if (player.body.touching.down) {
            player.body.setSize(180, 280, 150, 145);
        } else {
            player.body.setSize(100, 280, 175, 145);
        }  
    },
    checkIfPlayerOnTop: function() {
        game.physics.arcade.collide(player, ground);
        
        var coll = game.physics.arcade.collide(player, obstacles);
        if (player.body.touching.down && coll) {
            player.x = -100;    
        }
    },
    playerAppear: function() {
         if (player.x >= -275 && player.x < -100 && !playerInPosition) {
            player.x += 1;
            } else if (player.x >= -100) {
                game.input.enabled = true;
                player.x = -100; 
                playerInPosition = true; 
            }
    },
    playRandomSound: function(snd) {
        if ((space.isDown || pointer.isDown) && player.body.touching.down && player.alive) {
            snd.play();    
        }
    },
    playerJump: function() {
        if ((space.isDown || pointer.isDown) && player.body.touching.down) {
            jumptimer = 1;
            player.body.velocity.y = -300;
        } else if ((space.isDown || pointer.isDown) && (jumptimer != 0)) {
                            if (flag >= 0 && flag <= 10) {
                                player.animations.play('goUp', 15, true);
                                flag += 1;
                            }
                            if (flag > 10) {
                                player.animations.play('inAir', 10, true);
                            }
               if (jumptimer > 20) {
                jumptimer = 0;
               } else {
                jumptimer += 1;
                player.body.velocity.y = -300;
               }
        } else if ((space.isUp || pointer.isUp) && jumptimer != 0) {
             jumptimer = 0;

        } else if (jumptimer == 0 && !player.body.touching.down) {
                                player.animations.play('inAir', 10, true);  
                                if ((ground.y - player.y) <= 320) {
                                    player.animations.play('goDown', 10, true);    
                                }
        } else {
            this.run(anmSpeed);
            flag = 0;
        }
    },
    addObstacle: function() {   // ! but maybe fix the pause timer thing
            console.log('adding obs');
            var obs = obstacles.getFirstDead();
            if (obs) {
                if (!isDay) {
                    obs.tint = tint;            
                }
                obs.reset(game.world.width, game.world.height-obstacleSprite.height);
                obs.width = 70;
                obs.height = 70;
                obs.body.velocity.x = speed;
                obs.body.immovable = true;
                obs.isInFront = true;
            }
             obs.checkWorldBounds = true;
             obs.outOfBoundsKill = true;
    },
    addItem: function() {   // ! but maybe fix the pause timer thing
        if (!gameOver) {
            console.log('adding itm');
            var itm = items.getFirstDead(); 

            game.physics.arcade.enable(itm);
             if (itm) {
                 if (!isDay) {
                     itm.tint = tint;
                 }
                itm.reset(game.world.width, ranItemPlace);
                itm.body.velocity.x = speed;
                itm.itemFlag = true;
                this.addBounceEffect(itm);
             }
            itm.checkWorldBounds = true;
            itm.outOfBoundsKill = true;
        }
    },
    itemTaken: function() {
        game.physics.arcade.overlap(player, items, this._updateScore, null, this);
    },
    _updateScore: function(p, i) {
        i.kill();
        if (i.itemFlag == true) {
            itemSound.play();
            score += 1;      
            scoreText.text = 'score: ' + score;
            scoreTextInRect.text =  scoreText.text;
        }
        i.itemFlag = false;
    },
    addBounceEffect: function(i) {
        var bounce = game.add.tween(i);
        bounce.to( { y: i.y + 8 }, 260, 'Linear', true, 0, -1);
        bounce.yoyo(true);
    },
    checkObstacleItemOverlap: function() {
        console.log('checking overlap');
        game.physics.arcade.overlap(obstacles, items, function(o, i){
            i.kill();
        }, null, this);
    },
    paralax: function() {
        cityBack.tilePosition.x -= cityBackSpeed;
        cityMid.tilePosition.x -= cityMidSpeed;
        cityFront.tilePosition.x -= cityFrontSpeed;
        cloudsTop.x -= 0.002;
        cloudsBottom.x -= 0.005;
        if (cloudsTop.right < 0) {
            cloudsTop.reset(game.world.width, game.world.height/2 + 40);
        }
        if (cloudsBottom.right < 0) {
            cloudsBottom.reset(sky.width - 10, game.world.height/2 + 50);
        }
    },
    raiseDifficulty: function() {   // !
            if(score >= 0 && score < 10) {
                anmSpeed = 11;
                speed = -225;
                grassSpeed = 3.75;
            } else if(score >= 10 && score < 15) {
                anmSpeed = 13;
                speed = -260;
                grassSpeed = 4.35;
            } else if (score >= 15 && score < 20) {
                anmSpeed = 15;
                speed = -290;
                grassSpeed = 4.85;
                cityBackSpeed = 0.02;
                cityMidSpeed = 0.03;
                cityFrontSpeed = 0.04;
            } else if (score >= 20 && score < 25) {
                anmSpeed = 17;
                speed = -320;
                grassSpeed = 5.32;
            } else if (score >= 25 && score < 30) {
                anmSpeed = 18;
                speed = -370;
                grassSpeed = 6.2; 
            } else if (score >= 30 && score < 35) {
                anmSpeed = 18;
                speed = -400;
                grassSpeed = 6.7;
                cityBackSpeed = 0.025;
                cityMidSpeed = 0.035;
                cityFrontSpeed = 0.045;
        }
    },
    gameOver: function() {
      if (playerInPosition && (player.x < -110 || game.physics.arcade.overlap(player, obstacles)) ) {
          player.animations.stop();
          player.kill();
          speed = 0;
          grassSpeed = 0;
          //grass.tilePosition.x = 0;   // this was ON I think not needed uses gS
          cityBackSpeed = 0;
          cityMidSpeed = 0;
          cityFrontSpeed = 0;
          black.alpha = 0.5;
          
          obstacles.forEach(function(o){
              console.log(obstacles.length);
              console.log('kill obstacles');    // still runs after game over
              o.kill();
          }, this);
          items.forEach(function(d){
              console.log(items.length);
              console.log('kill items');      // still runs after game over
              d.kill();
           }, this);
           stageMusic.stop();
           this._showScoreScreen();

          if (gameOverCounter === 0) {
             gameOver = true;
             inputVisible = true;
             
          }
          gameOverCounter++;
          console.log('game over running');
         // universalTimer.destroy(); // this should do the trick NOPE!
        }
    },
    _showScoreScreen: function() {
        if (rectangle.alpha != 1 && scoreTextInRect.alpha != 1 && topScoreTextInRect.alpha != 1 && playAgainText.alpha != 1) {
            rectangle.alpha = 1;
            topScoreTextInRect.alpha = 1;
            scoreTextInRect.alpha = 1;
            playAgainText.alpha = 1;
            mainMenuText.alpha = 1;
            
            playAgainText.inputEnabled = true;
            mainMenuText.inputEnabled = true;
            playAgainText.events.onInputDown.add(function(){
                this._setDefaults();
                game.state.start(game.state.current);
            }, this);
            mainMenuText.events.onInputDown.add(function(){
                this._setDefaults();
                game.state.start('MainMenu');
            }, this);
            
            localStorage.setItem("HighScore",Math.max(score, topScore));
            if (score > topScore) {
                topScoreTextInRect.text = 'top score: ' + score;
                } else {
                    topScoreTextInRect.text = 'top score: ' + topScore;
                }
            
            
            /*
            space.onDown.add(function(){
                this._setDefaults();
                game.state.start(game.state.current);
            }, this);
            */
            
        }
    },
    _setDefaults: function() {
        pass = 0;
        score = 0;
        anmSpeed = 11;
        speed = -200;
        grassSpeed = 3.32;
        cityBackSpeed = 0.015;
        cityMidSpeed = 0.020;
        cityFrontSpeed = 0.030;
        obstacleTime = -1;
        itemTimer = -1;
        playerInPosition = false;
        universalTimer.destroy();
        universalTimer = game.time.create(false);
        playAgainText.inputEnabled = false;
        gameOverCounter = 0;
        gameOver = false;
        inputVisible = false;
       // console.log('inputVisible: ' +inputVisible)
    },
    _ActiveText: function(txt) {
        //txt.stroke = "#FFF";
        //txt.strokeThickness = 5;
        txt.setShadow(0, 3, "#333333", 2, true, false);
    },
    _DeActiveText: function(txt) {
       // txt.stroke = '#FFF';
       // txt.strokeThickness = 5;
        txt.setShadow();
    },
    CheckOption: function() {
        if (playAgainText.input.pointerOver()) {
                this._ActiveText(playAgainText);
            } else {
                this._DeActiveText(playAgainText);
            }
            if (mainMenuText.input.pointerOver()) {
                this._ActiveText(mainMenuText);
            } else {
                this._DeActiveText(mainMenuText);
            }
    },
    SunsetGradient: function() {
        var bmd = game.add.bitmapData(512, 400);
    bmd.addToWorld();

    var x1 = 500;
    var a1 = 10;
    
    for (var i = 0; i < 10; i++)
    {
        var c = Phaser.Color.interpolateColor(0xff863d, 0xffc58f, 10, i, a1);

        bmd.rect(x1, 0, 100, 400, Phaser.Color.getWebRGB(c));
      //  bmd.blendColorDodge();
        
        x1 += 2;
        a1 += 4;
    }
    
    // 222222222
    var x2 = 480;
    var a2 = 8;
    
    for (var j = 0; j < 20; j++)
    {
        var c = Phaser.Color.interpolateColor(0xe953c6, 0xf35e7f, 20, j, a2);
        bmd.rect(x2, 0, 100, 400, Phaser.Color.getWebRGB(c));
       // bmd.blendSoftLight();
        // bmd.blendColorDodge();
        x2 += 4;
        //a2 += 2;
    }
        
    }
};