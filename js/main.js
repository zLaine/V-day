window.onload = function() 
{
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/master/resources/Project%20Templates/Basic
    
    "use strict";
    
    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );

    var people;
    var blkCat;
    var arrow;
    var reunited;
    var map;
    var background;
    var x;
    var y;
    
    function preload() 
    {
        game.load.spritesheet('blkCat', 'assets/blkCatJump.png', 32, 32, 15 );
        game.load.image('arrow', 'assets/arrow1.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('BG', 'assets/grassyBG.png');
        game.load.tilemap('map', 'assets/vDayBG.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.audio('reunited', 'assets/Reunited1.mp3');
    }
    
    
    function create() 
    {
        game.world.setBounds(0, 0, 800, 600);
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.sprite(0,0, 'BG');
        
        //playing music
        reunited = game.add.audio('reunited');
        reunited.loop = true;
        reunited.play();
        
        people = game.add.group();
        game.physics.arcade.enable(people);
        people.enableBody = true;
        people.physicsBodyType = Phaser.Physics.ARCADE;
    //    people.body.allowRotation = false;
    //    people.body.collideWorldBounds = true;
        // allows mouse clicks
        background.events.onInputDown.add(arrowRelease, this);
        
        for (var i = 0; i < 20; i++)
        {
            var c = people.create(game.rnd.integerInRange(100, 770), game.rnd.integerInRange(0, 570), 'blkCat', game.rnd.integerInRange(0, 15));
            c.name = 'char' + i;
            c.body.immovable = true;
            c.inputEnabled = true;
            c.scale.set(2);
        }
        
        blkCat = game.add.sprite(32, game.world.height - 150, 'blkCat');
        game.physics.arcade.enable(blkCat);
        blkCat.body.bounce.y = 0.2;
        blkCat.body.collideWorldBounds = true;
        //girl.scale.set(2);
        
    /*    arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        arrow.body.allowRotation = false; */
        
        
        blkCat.animations.add('left', [0, 1, 2], 10, true);
        blkCat.animations.add('right', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15], 10, true); 
        
       //blkCat.animations.play('right', 10, true);


       game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
        
    }
    
    function update() 
    {
        game.physics.arcade.collide(arrow, people, collisionHandler, null, this);
        game.physics.arcade.collide(people, people);
        
     }
     
     function arrowCreate()
     {
        arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        //arrow.body.allowRotation = false; 
        
        arrow.events.onInputDown.add(arrowRelease, this);
     }
     
     function arrowRelease()
     {
        arrow = game.add.sprite(game.world.centerX, game.world.centerY, 'arrow');
        game.physics.arcade.enable(arrow);
        arrow.enableBody = true;
        arrow.physicsBodyType = Phaser.Physics.ARCADE;
        //arrow.body.allowRotation = false; 
        
        x = game.input.mousePointer.x;
        y = game.input.mousePointer.y;
        arrow.rotation = game.physics.arcade.moveToXY(arrow, x, y, 120);
     }
     
     function collisionHandler (arrow, people) 
    {
        people.kill();
        arrow.kill();
    }
     
    /*function render() 
    {
        var zone = game.camera.deadzone;
    
        game.context.fillStyle = 'rgba(255,0,0,0.6)';
        game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    
        game.debug.cameraInfo(game.camera, 32, 32);
        game.debug.spriteCoords(girl, 32, 500);
    } */
};
