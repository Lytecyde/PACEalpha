import Dialogue from '../js/dialogue.js';

var player;
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
        this.load.image('arrow', '../assets/sprites/spy_white.png');
    },

    create: function ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);

        this.input.once('pointerdown', function (event) {

            console.log('From SceneB_CityView to SceneC');

            this.scene.start('sceneC');

        }, this);
    },

    update: function (time, delta)
    {
        this.arrow.rotation += 0.01;
    }

});

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
          'spyblack-left',
          '../assets/sprites/spy_black_left.png'
        );
        this.load.image(
          'spywhite-left',
          '../assets/sprites/spy_white_left.png'
        );
        this.load.image(
          'spygray-left',
          '../assets/sprites/spy_gray_left.png'
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

            console.log('From SceneC to SceneA_Options');

            this.scene.start('SceneA_Options');
          },
        this);

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
          bomb = this.physics.add.sprite(
            spyblack_location.x,
            spyblack_location.y,
            'bomb'
          );
          blast = this.physics.add.sprite(100, 100, "explosion");
          throwsBomb();
          bombExplodes = false;
          timer = 0;
        }
    }

});

var cursors;

function isClose () {
    proximity = true;
};

function parlay () {
    //cut talk if not close
    if (!proximity) {
        talking = false;
        return;
    }
    //TALK options 💬
    if (!talking && proximity) {
      console.log('tralalalala');

      var dialogue = new Dialogue();

      talking = true;
    };
}

var onBlast = function(){
   //throwSpeed = 30

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
  console.log("BOMB");
  bomb.setAngle(15);
  bomb.angularVelocity = 15;
  var direction;
  direction = spyblack_location.x >= spywhite_location.x ? -1:1;
  bomb.setVelocity(direction * 400, -400);
  bomb.setDrag(40,0);
  bomb.setGravity(0, 1600);
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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
    scene: [ SceneA_Options, SceneB_CityView, SceneC ]
};

var game = new Phaser.Game(config);
