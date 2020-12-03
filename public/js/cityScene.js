import City from '../js/city.js';

export default class CityScene extends Phaser.Scene{

  constructor() {
        super("SceneB_CityView");
    };
  preload ()
  {
    //this.load.image('arrow', '../assets/sprites/spy_white.png');
    
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

    this.load.image(
      'bomb',
      '../assets/sprites/bomb.png'
    );

    this.load.spritesheet(
      'explosion',
      '../assets/sprites/explosion_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
    );

  };

  create ()
  {
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

    
    var nuCity = new City(); 
    var avenue = nuCity.createAvenue();
    

    var layer = nuCity.createCity(this);

    cursors = this.input.keyboard.createCursorKeys();

    player = this.physics.add.sprite(32 * 4 + 16, 32, 'spygray-right');
    player.setCollideWorldBounds(true);

    proponents = this.add.group();
    proponents.createMultiple(
    {
        key: 'baddies',
        frame: 0,
        setXY: { x: 16, y: 144},
        frameQuantity: 2,
        repeat: 15
    });

    setLocations(proponents.getChildren());
    //prepare bombs
    var bombIndex = 0;
    proponents.
    getChildren().
    forEach(agent => {
        bombs[bombIndex] = this.physics.add.sprite(
          agent.getTopCenter().x,
          agent.getTopCenter().y,
        'bomb'
        );
        bombIndex++;
      }
    );
    
    this.input.once('pointerdown', function (event) {
        console.log('From SceneB_CityView to SceneC');
        this.scene.start('sceneC');
    }, this);

    this.load.image(
      'bomb',
      '../assets/sprites/bomb.png'
    );

    this.load.spritesheet(
      'explosion',
      '../assets/sprites/explosion_spritesheet.png',
      { frameWidth: 32, frameHeight: 32 }
    );

    blastWar(proponents.getChildren());  
  };

  update (time, delta)
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
};