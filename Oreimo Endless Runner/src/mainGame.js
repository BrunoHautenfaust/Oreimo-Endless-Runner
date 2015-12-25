Game.MainState = function(game) {};

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
    arr = [700, 1200, 2000],
    soundArray = [],
    stageMusic,
    itemTimer = -1,
    itemPlace = [150, 300, 200],
    itemFlag,
    ranItemPlace;

Game.MainState.prototype = {
  
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
        sun = game.add.sprite(game.width - 50, 100,'sun');
        sun.scale.setTo(0.4,0.4);
        sun.anchor.setTo(0.5, 0.5);
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
        space.enabled = false;

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
       rectangle = game.add.sprite(game.world.centerX - rectangle.width/2, game.world.centerY - rectangle.height/2,'rectangle');
        
        var style2 = { fontSize: '22px', fill: '#093' }
        topScoreTextInRect = game.add.text(game.world.centerX - rectangle.width/2 + 10, game.world.centerY - rectangle.height/2 + 6,'top score: 0', style2);
        scoreTextInRect = game.add.text(game.world.centerX - rectangle.width/2 + 10, game.world.centerY - rectangle.height/2 + 30, 'score: 0', style2);
        playAgainText = game.add.text(game.world.centerX - rectangle.width/2 + 30, game.world.centerY - rectangle.height/2 + 55, 'Play again', {fill: '#093'});
        playAgainText.stroke = "#FFF";
        playAgainText.strokeThickness = 5;
        playAgainText.setShadow(0, 3, "#333333", 2, true, false);
        
        rectangle.alpha = 0;
        topScoreTextInRect.alpha = 0;
        scoreTextInRect.alpha = 0;
        playAgainText.alpha = 0;
        
        
        universalTimer = game.time.create(false);
        universalTimer.start();
        
        game.onBlur.add(function(){
            universalTimer.pause();
            game.paused = true;
            game.sound.pauseAll();
            black.alpha = 0.5;
        }, this);
        
        game.onFocus.add(function(){
            universalTimer.resume();
            game.paused = false;
            game.sound.resumeAll();
            black.alpha = 0;
        }, this);
    },
   
	update() {
        this.checkIfPlayerOnTop();

        this.playerAppear();
        this.paralax();
        grass.tilePosition.x -= grassSpeed;
        ranNum = rdg.pick(arr);
        ranItemPlace = rdg.pick(itemPlace);
        
        this.setBodySize();
        this.playerJump();
        var ranSnd = rdg.pick(soundArray);
        this.playRandomSound(ranSnd);
        
        this.startObstacleAndItemTimer();
        this.checkObstacleItemOverlap();
        this.itemTaken();
        this.raiseDifficulty();
        this.updateSpeedForAliveElements();
     
        this.gameOver();
	},
    render() {
        //game.debug.body(player);
    },
    updateSpeedForAliveElements: function() {
      obstacles.forEachAlive(function(o){
            o.body.velocity.x = speed;
        }, this);
        
        items.forEachAlive(function(i) {
            i.body.velocity.x = speed;
        }, this);  
    },
    startObstacleAndItemTimer: function() {
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
                space.enabled = true;
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
    addObstacle: function() {
        var obs = obstacles.getFirstDead();
        if (obs) {
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
    addItem: function() {
        var itm = items.getFirstDead(); 
        game.physics.arcade.enable(itm);
         if (itm) {
            itm.reset(game.world.width, ranItemPlace);
            itm.body.velocity.x = speed;
            itm.itemFlag = true;
            this.addBounceEffect(itm);
         }
        itm.checkWorldBounds = true;
        itm.outOfBoundsKill = true;
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
    raiseDifficulty: function(){
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
          grass.tilePosition.x = 0;
          cityBackSpeed = 0;
          cityMidSpeed = 0;
          cityFrontSpeed = 0;
          black.alpha = 0.5;
          
          obstacles.forEach(function(o){
              o.kill();
          }, this);
          items.forEach(function(d){
              d.kill();
           }, this);
           stageMusic.stop();
           this._showScoreScreen();
        }  
    },
    _showScoreScreen: function() {
        if (rectangle.alpha != 1 && scoreTextInRect.alpha != 1 && topScoreTextInRect.alpha != 1 && playAgainText.alpha != 1) {
            rectangle.alpha = 1;
            topScoreTextInRect.alpha = 1;
            scoreTextInRect.alpha = 1;
            playAgainText.alpha = 1;
            
            playAgainText.inputEnabled = true;
            playAgainText.events.onInputDown.add(function(){
                this._setDefaults();
                game.state.start(game.state.current);
            }, this);
            
            localStorage.setItem("HighScore",Math.max(score, topScore));
            if (score > topScore) {
                topScoreTextInRect.text = 'top score: ' + score;
                } else {
                    topScoreTextInRect.text = 'top score: ' + topScore;
                }
            space.onDown.add(function(){
                this._setDefaults();
                game.state.start(game.state.current);
            }, this);
            
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
    }
};