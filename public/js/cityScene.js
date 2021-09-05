import City from '../js/city.js';
//import LevelMap from '../js/levelmap.js';
import Activities from '../js/activities.js';
import Helper from '../js/helper.js';

/**
 * CityScene
 * CityScene consists of buildings, roads and recreational blocks
 * white/black and gray agents walk around on sidepaths.
 * there are events/actions like bombs(ActionBehaviour)/Talking
 * 
 */
export default class CityScene extends Phaser.Scene {
  nuCity;
  player;
  bombs = [];
  
  constructor () {
    super("SceneB_CityView");
    this.nuCity = new City();
  };

  makeLocations () {
    const WIDTH = 32;
    const HEIGHT = 24;
    var locations = [];
    const tiles = {
      SIDEPATH: 3,
    }
    var k = 0;
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < HEIGHT; i++){
        var n = this.nuCity;
        var level = n
          .getLevel()
          .slice();
        k = (j * WIDTH)  + i; 
        if (level[k] === tiles.SIDEPATH) {
          locations.push({x: i, y: j});      
        }
        k++;
      }
    }
    return locations;
  }
  
  setLocations (proponents) { 
    var locations = this.makeLocations();
    var h = new Helper();
    var shuffledLocations = h.shuffle(locations);
    var i = 0;
    var l = [];
    var tileSizepx = 32;
    l = shuffledLocations.slice();
    proponents.forEach(agent => {
      //console.log(l[i]);
      var positionX = (l[i].x ) * tileSizepx;
      var positionY = (l[i].y ) * tileSizepx;
      agent.setPosition(positionX, positionY);
      agent.setOrigin(0,0);
      i++;
    });
  }

  preload ()
  {
    //this.load.image('arrow', '../assets/sprites/spy_white.png');
    
    this.load.spritesheet('baddies', '../assets/sprites/baddies.png',
      {frameWidth:32, frameHeight:32}
    );

    this.load.spritesheet("city-tiles", "../assets/tileart/darkCity2.png",
    { frameWidth: 32, frameHeight: 32 });

    this.load.tilemapCSV("housemap", "../assets/maps/house.csv");

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

  createLevelMapCity (scene) 
  {
    var city = scene.nuCity;
    city.createCity();
    var level = city.getLevel().slice();
    const w = 32;
    const  h = 24;
    let levelMapData = Array.from(Array(w), () => new Array(h));
    
    var i = 0;
    
    for (let height = 0; height < h; height++) {  
      for (let width = 0; width < w; width++ ) {
        levelMapData[height][width] = level[i];
        i++; 
      }
    }
    return levelMapData;
  }

  create ()
  {
    var levelMapData = this.createLevelMapCity(this); 

    var mapCity = this.make.tilemap({data: levelMapData, tileWidth: 32, tileHeight: 32});
    var tiles = mapCity.addTilesetImage('city-tiles');
    var layer = mapCity.createLayer(0, tiles, 0, 0);

    this.player = this.physics.add.sprite(32 * 4 + 16, 32, 'spygray-right', 0);
    this.player.setCollideWorldBounds(true);
    
    var proponentsWhite = this.add.group();
    proponentsWhite.createMultiple(
    {
        key: 'baddies',
        frame: 4,
        setXY: { x: 16, y: 144},
        frameQuantity: 1,
        repeat: 8
    });
    
    var proponentsBlack = this.add.group();
    proponentsBlack.createMultiple(
    {
        key: 'baddies',
        frame: 0,
        setXY: { x: 16, y: 144},
        frameQuantity: 1,
        repeat: 8
    });

    //prepare bombs
    var bombIndex = 0;
    var bombs = {};
    proponentsWhite.
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
    
    this.setLocations(proponentsWhite.getChildren());
    this.setLocations(proponentsBlack.getChildren());
    
    this.physics.add.existing(this.player);

    this.physics.add.collider(this.player, layer);

    mapCity.setCollisionBetween(0, 0);

    //layer.setCollisionByExclusion([3]);
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
     
    var onBlast = function() {
      blast.x = bomb.x;
      blast.y = bomb.y;
      blast.play('bang');
      blast.once(Phaser.Animations.Events.SPRITE_ANIMATION_COMPLETE, () => {
        bomb.destroy();
      });
      bombExplodes = false;
    };
    
    var onKillaBlast = function(){
      onBlast();
      spywhite.destroy();
    }

    function throwsBombAt() {
      bombs.forEach(bomb => {
        bomb.setAngle(15);
        bomb.angularVelocity = 15; 
        var direction;
        var location = bomb.getTopCenter();
        direction = location.x >= location.x ? -1:1;
        bomb.setVelocity(direction * 400, -400);
        bomb.setDrag(40, 0);
        bomb.setGravity(0, 1600);
      });
    }

    function throwsBomb() {
      throwsBombAt(spyblack_location);
    }
    
    function blastWar ()
    {
      bombs.forEach (blast =>  {
        var location = blast.getTopCenter(blast);
        throwsBombAt(location); 
      });
    }

    //blastWar();  
  };

  update (time, delta)
  {
    var cursors = this.input.keyboard.createCursorKeys();
    this.player.setVelocity(0);

    if (cursors.left.isDown)
    {
      this.player.toggleFlipX();
      this.player.setVelocityX(-100);
    }
    else if (cursors.right.isDown)
    {
      this.player.toggleFlipX();
      this.player.setVelocityX(100);
    }

    if (cursors.up.isDown)
    {
      this.player.setVelocityY(-100);
    }
    else if (cursors.down.isDown)
    {
      this.player.setVelocityY(100);
    }

  }
};

