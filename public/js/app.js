var player;


var SceneA = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneA ()
    {
        Phaser.Scene.call(this, { key: 'sceneA' });
    },

    preload: function ()
    {

        this.load.image('face', '../assets/sprites/spy_gray.png');
    },

    create: function ()
    {
        this.add.sprite(400, 300, 'face');

        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);
    }

});

var SceneB = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function SceneB ()
    {
        Phaser.Scene.call(this, { key: 'sceneB' });
    },

    preload: function ()
    {
        this.load.image('arrow', '../assets/sprites/spy_white.png');
    },

    create: function ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);

        this.input.once('pointerdown', function (event) {

            console.log('From SceneB to SceneC');

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
    },

    preload: function ()
    {
        this.load.image('spyblack-right', '../assets/sprites/spy_black.png');
        this.load.image('spywhite-right', '../assets/sprites/spy_white.png');
        this.load.image('spygray-right', '../assets/sprites/spy_gray.png');
        this.load.image('spyblack-left', '../assets/sprites/spy_black_left.png');
        this.load.image('spywhite-left', '../assets/sprites/spy_white_left.png');
        this.load.image('spygray-left', '../assets/sprites/spy_gray_left.png');

    },

    create: function ()
    {
        cursors = this.input.keyboard.createCursorKeys();

        this.spyblack = this.add.sprite(Phaser.Math.Between(0, 800), 300, 'spyblack-right');

        this.spywhite = this.add.sprite(Phaser.Math.Between(0, 800), 300, 'spywhite-right');

        player = this.physics.add.image(400, 300, 'spygray-right');

        player.setCollideWorldBounds(true);

        this.input.once('pointerdown', function (event) {

            console.log('From SceneC to SceneA');

            this.scene.start('sceneA');

        }, this);
    },

    update: function (time, delta)
    {
      player.setVelocity(0);

      if (cursors.left.isDown)
      {
          player.toggleFlipX();
          //player = this.physics.add.sprite(player.x, player.y, 'spygray-left');
          player.setVelocityX(-300);
      }
      else if (cursors.right.isDown)
      {
          player.toggleFlipX();
          //player = this.physics.add.sprite(player.x, player.y, 'spygray-right');
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
    }

});

var cursors;

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#fff',
    baseURL: 'http://localhost:8080/',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);
