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
        this.add.sprite(400, 300, 'face').setAlpha(0.2);

        this.input.once('pointerdown', function () {

            console.log('From SceneA to SceneB');

            this.scene.start('sceneB');

        }, this);
    }

});
<<<<<<< HEAD

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
        this.load.image('spyblack', '../assets/sprites/spy_black.png');
        this.load.image('spywhite', '../assets/sprites/spy_white.png');
        this.load.image('spygray', '../assets/sprites/spy_gray.png');

=======

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
        this.load.image('spyblack', '../assets/sprites/spy_black.png');
>>>>>>> a8d1924dbc9406f05518d6c0f37c880db1e8fe1d
    },

    create: function ()
    {
        cursors = this.input.keyboard.createCursorKeys();

        this.spyblack = this.add.sprite(Phaser.Math.Between(0, 800), 300, 'spyblack');

<<<<<<< HEAD
        this.spywhite = this.add.sprite(Phaser.Math.Between(0, 800), 300, 'spywhite');

        player = this.physics.add.image(400, 300, 'spygray');
=======
        player = this.physics.add.image(400, 300, 'spyblack');
>>>>>>> a8d1924dbc9406f05518d6c0f37c880db1e8fe1d

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
          player.setVelocityX(-300);
      }
      else if (cursors.right.isDown)
      {
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
    physics: {
        default: 'arcade',
        arcade: {
<<<<<<< HEAD
            debug: false
=======
            debug: true
>>>>>>> a8d1924dbc9406f05518d6c0f37c880db1e8fe1d
        }
    },
    parent: 'phaser-example',
    scene: [ SceneA, SceneB, SceneC ]
};

var game = new Phaser.Game(config);
