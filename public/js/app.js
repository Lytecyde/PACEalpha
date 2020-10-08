import Dialogue from '../js/dialogue.js';

var player;
var layer;
var spyblack, spywhite;
var spyblack_location, spywhite_location;
var blast;
var timedEvent;
var bomb;
var throwSpeed;
var talking, proximity;
var keyObjE;
var timedEvent;
var timer = 0;
var bombExplodes;
var trust = 0;
var serenity = 100;
var enter;

const CANVAS_WIDTH = 32 * 8 * 6;
const CANVAS_HEIGHT = 32 * 7 * 3;

var SceneA_Options = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA_Options ()
    {
        Phaser.Scene.call(this, { key: 'SceneA_Options' });
    },

    preload: function ()
    {

        this.load.image('face', '../assets/sprites/spy_gray.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'face');

        this.input.once('pointerdown', function () {

            console.log('From SceneA_Options to SceneB_CityView');

            this.scene.start('SceneB_CityView');

        }, this);
    }

});

var SceneB_CityView = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB_CityView ()
    {
        Phaser.Scene.call(this, { key: 'SceneB_CityView' });
    },

    preload: function ()
    {
        //this.load.image('arrow', '../assets/sprites/spy_white.png');
        //TODO: create baddies.png
        this.load.spritesheet('baddies', '../assets/sprites/baddies.png',
          {frameWidth:32, frameHeight:32}
        );
        this.load.image("tiles", "../assets/tileart/darkCity.png");
        this.load.tilemapCSV("map", "../assets/maps/house.csv");

        this.load.image(
          'spygray-right',
          '../assets/sprites/spy_gray.png'
        );

        this.load.image(
          'spygray-left',
          '../assets/sprites/spy_gray_left.png'
        );
    },

    create: function ()
    {
        layer = createCity(this);

        cursors = this.input.keyboard.createCursorKeys();

        player = this.physics.add.sprite(32*4 +16, 32, 'spygray-right');
        player.setCollideWorldBounds(true);

        var proponents = this.add.group(
          { key: 'baddies',
            frame: 0,
            repeat: 15,
            setXY: { x: 16, y: 144, stepX: 32 }
          }
        );

        this.input.once('pointerdown', function (event) {
            console.log('From SceneB_CityView to SceneC');
            this.scene.start('sceneC');
        }, this);
    },

    update: function (time, delta)
    {
       this.physics.add.collider(player, layer);

       player.setVelocity(0);

       if (cursors.left.isDown)
       {
           player.toggleFlipX();
           player.setVelocityX(-100);
       }
       else if (cursors.right.isDown)
       {
           player.toggleFlipX();
           player.setVelocityX(100);
       }

       if (cursors.up.isDown)
       {
           player.setVelocityY(-100);
       }
       else if (cursors.down.isDown)
       {
           player.setVelocityY(100);
       }

    }

});

//TalkScene
var TalkScene = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:

  function TalkScene ()
  {
    Phaser.Scene.call(this, {key: 'TalkScene'});
  },
  create: function ()
  {
    enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    this.scene.launch('TalkScene');

    document.getElementById("talk").style.visibility = "visible";

    //change scene
    this.input.once(
      'pointerdown',
      function (event) {
        console.log('From TalkScene to SceneA_Options');
        this.scene.start('SceneA_Options');
      },
    this);

    enter.on('down', function (key, event) {
      addText();
    });
  }
});

//WalkScene
var SceneC = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneC ()
    {
        Phaser.Scene.call(this, { key: 'sceneC' });
        talking = false;
        throwSpeed = 20;
    },

    preload: function ()
    {
        this.load.image(
          'spyblack-right',
         '../assets/sprites/spy_black.png'
        );

        this.load.image(
          'spywhite-right',
          '../assets/sprites/spy_white.png'
        );

        this.load.image(
          'spygray-right',
          '../assets/sprites/spy_gray.png'
        );

        this.load.image(
          'spygray-left',
          '../assets/sprites/spy_gray_left.png'
        );

        this.load.image(
          'spyblack-left',
          '../assets/sprites/spy_black_left.png'
        );
        this.load.image(
          'spywhite-left',
          '../assets/sprites/spy_white_left.png'
        );

        this.load.image(
          'bomb',
          '../assets/sprites/bomb.png'
        );

        this.load.spritesheet(
          'explosion',
          '../assets/sprites/explosion_spritesheet.png',
          { frameWidth: 32, frameHeight: 32 }
        );

        this.load.spritesheet(
          'baddies',
          '../assets/sprites/baddies.png',
          { frameWidth: 32, frameHeight: 32 }
        );

        loadCity(this);
    },

    create: function ()
    {

        cursors = this.input.keyboard.createCursorKeys();

        bombExplodes = false;

        keyObjE = this.input.keyboard.addKey('E');

        spyblack_location = {
          x:Phaser.Math.Between(0, 800),
          y: 300};
        spywhite_location = {
          x:Phaser.Math.Between(0, 800),
          y: 300};

        spyblack = this.physics.add.sprite(
          spyblack_location.x,
          spyblack_location.y,
          'spyblack-right');

        spywhite = this.physics.add.sprite(
           spywhite_location.x,
           spywhite_location.y,
           'spywhite-right'
        );

        bomb = this.physics.add.sprite(
          spyblack_location.x,
          spyblack_location.y,
          'bomb'
        );

        //throwsBomb();
        //blast = game.add.weapon(12,'bomb');
        //blast.autofire = true;
        //blast.fireRate = 6000;
        blast = this.physics.add.sprite(100, 100, "explosion");

        player = this.physics.add.sprite(400, 300, 'spygray-right');

        this.physics.add.collider(player, this.spyblack);
        this.physics.add.collider(player, this.spywhite);

        //talk when meeting black side
        this.physics.add.overlap(
          player,
          this.spyblack,
          parlay,
          null,
          this
        );

        player.setCollideWorldBounds(true);

        //bombattack
        //TO DO

        //change scene
        this.input.once(
          'pointerdown',
          function (event) {

            console.log('From SceneC to TalkScene');

            this.scene.start('TalkScene');
          },
        this);
        //create explosion animation
        this.anims.create({
          key: 'bang',
          frames: this.anims.generateFrameNumbers(
            'explosion',
           { start: 0, end: 11 }),
          defaultTextureKey: null,

          // time
          delay: 0,
          frameRate: 24,
          duration: null,
          skipMissedFrames: true,

          // repeat
          repeat: 0,
          repeatDelay: 2,
          yoyo: false,

          // visible
          showOnStart: false,
          hideOnComplete: true
        });
    },

    update: function (time, delta)
    {
        //overlap to talk
        proximity = false;

        this.physics.world.overlap(player, spyblack, isClose, null, this);
        this.physics.world.overlap(player, spywhite, isClose, null, this);

        //this.physics.world.overlap(bomb, spyblack,   onBlast, null, this);
        this.physics.world.overlap(bomb, spywhite, onKillaBlast, null, this);
        //let's talk
        parlay();
        //movement of player agent
        player.setVelocity(0);

        if (cursors.left.isDown)
        {
            player.toggleFlipX();
            player.setVelocityX(-300);
        }
        else if (cursors.right.isDown)
        {
            player.toggleFlipX();
            player.setVelocityX(300);
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-300);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(300);
        }

        if(keyObjE.isDown)
        {
          //blast.play('bang');
        }

        if(bomb.y < 300){
          //bomb.x += speedBomb * delta;
          bomb.angle += 4;
        }

        if(bomb.y > 300 && bombExplodes === false) {
          bomb.y = 300;
          bomb.setVelocity(0,0);
          bombExplodes = true;
          onBlast();
        }

        timer += delta;
        if (timer > 3000) {
          console.log('trust' + trust);

            if( (trust < 3) &&
              (talking === false)){
              bomb = this.physics.add.sprite(
                spyblack_location.x,
                spyblack_location.y,
                'bomb'
              );
              blast = this.physics.add.sprite(100, 100, "explosion");
              throwsBomb();

            }

          bombExplodes = false;
          timer = 0;
        }
    }

});

var cursors;

function addText ()
{
    document.getElementById('chat-history').innerHTML +=
      document.getElementById('reply').value + "\n";
};

function createAvenue () {
  var house = [
    [0,0,0,0,3,6,6,3],
    [0,0,0,0,3,2,2,3],
    [0,0,0,0,3,2,2,3],
    [0,4,4,0,3,2,2,3],
    [3,3,3,3,3,6,6,3],
    [1,1,1,1,7,2,2,7],
    [1,1,1,1,7,2,2,7]
  ];
  return house.concat(house, house);
}

function zipconcat (a, b) {
  var c = [[]];
  for (var i = 0; i < a.length; i++) {
    c[i] = a[i].concat(b[i]);
  }
  return c;
}

function createCity (scene) {
  var avenue = createAvenue();
  var level = zipconcat(zipconcat(avenue, avenue), zipconcat(avenue, avenue));
  const map = scene.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
  const block = scene.make.tilemap({ data : level , tileWidth: 32, tileHeight: 32})
  const tileset = block.addTilesetImage("tiles");
  const layer = block.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
  //walk path
  layer.setCollisionBetween(0, 0);
  return layer;
};

function isClose () {
    proximity = true;
};

function parlay () {
    //cut talk if not close
    if (!proximity) {
        talking = false;
        return ;
    }
    //TALK options 💬
    if (!talking && proximity) {
      //console.log('tralalalala');
      trust += 1;
      var dialogue = new Dialogue();
      dialogue.negotiationStairway(trust);
      talking = true;
    };


}

var onBlast = function(){
  blast.x = bomb.x;
  blast.y = bomb.y;
  blast.play('bang');
  blast.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
      bomb.destroy();
   });
  //
  bombExplodes = false;
};

var onKillaBlast = function(){
  onBlast();
  spywhite.destroy();
}

function throwsBomb() {

  bomb.setAngle(15);
  bomb.angularVelocity = 15;
  var direction;
  direction = spyblack_location.x >= spywhite_location.x ? -1:1;
  bomb.setVelocity(direction * 400, -400);
  bomb.setDrag(40,0);
  bomb.setGravity(0, 1600);
}

function loadCity(scene) {
  var map = [];
}

var config = {
    type: Phaser.AUTO,
    width: CANVAS_WIDTH,
    height: 32 * 7 * 3,
    backgroundColor: '#fff',
    baseURL: 'http://localhost:8080/',
    physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 0 },
            debug: false
        }
    },
    parent: 'phaser-example',
    scene: [ SceneA_Options, SceneB_CityView, SceneC, TalkScene ]
};

var game = new Phaser.Game(config);
