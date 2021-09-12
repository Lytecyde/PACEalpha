import City from '../js/city.js';
//import LevelMap from '../js/levelmap.js';
import Activities from '../js/activities.js';
import Character from '../js/character.js';
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
  action;
  timer;
  proponentsBlack;
  proponentsWhite;
  paths = [];
  legalPaths = [];
  level = [];
  n;
  characters = [];
  stepIndex;
  numberOfAgents;

  constructor () {
    super("SceneB_CityView");
    this.timer = 0;
    this.nuCity = new City();
    this.action = new Activities();
    this.level = 
      this
      .nuCity
      .getLevel()
      .slice();
    this.numberOfAgents = 2; 
  
    for (let index = 0; index < this.numberOfAgents; index++) {
      var c = new Character();  
      if (c.path.length !== 0) {
        this.characters.push(c); 
      }
    }
    this.stepIndex = 0;
  };
  //TODO: refactor into locations.js or agents...
  makeLocations () {
    const WIDTH = 32;
    const HEIGHT = 24;
    var locations = [];
    const tiles = {
      BUILDING: 0,
      ROAD_HORIZONTAL: 1,
      ROAD_VERTICAL: 2,
      SIDEPATH: 3,
      DOOR: 4,
      CROSSING_VERTICAL: 6,
      CROSSING_HORIZONTAL: 7,
      CROSSING: 8,
      GARDEN: 9,
    }

    const allDoors = 
      [{x:1, y:4}, {x:9, y:4}, {x:17, y:4}, {x:25, y:4},
      {x:1, y:14},{x:9, y:14},{x:17, y:14},{x:25, y:14},
      {x:1, y:22},{x:9, y:22},{x:17, y:22},{x:25, y:22}]
    ;
    var k = 0;
    var level = this.level
    for (var j = 0; j < WIDTH; j++) {
      for (var i = 0; i < HEIGHT; i++){
        k = (j * WIDTH)  + i; 
        //create start points for agents
        if (false) 
        {
          locations.push({x: i, y: j});
        }
        //create legal paths for agents
        if (level[k] !== tiles.BUILDING &&
          level[k] !== tiles.ROAD_HORIZONTAL &&
          level[k] !== tiles.ROAD_VERTICAL
          ) {
          this.legalPaths.push({x: i, y: j}); 
        }

        k++;
      }
    }
    return allDoors;//locations;
  }
  
  setLocations (proponents) { 
    var locations = this.makeLocations();
    var h = new Helper();
    var shuffledLocations = h.shuffle(locations);
    var i = 0;
    var l = [];
    var tileSize = {px: 32};
    l = shuffledLocations.slice();
    proponents.forEach(agent => {
      //console.log(l[i]);
      var positionX = (l[i].x ) * tileSize.px;
      var positionY = (l[i].y ) * tileSize.px;
      agent.setPosition(positionX, positionY);
      agent.setOrigin(0,0);
      i++;
    });
  }

  createPathsForEachAgent () {
    //TODO refactor for each job an agent might have
    //startpoint
    //getlocations...
    //endpoint
    
    //return the whole route
    
  }  

  distance (start, end) {
    var xdiff = Math.abs(start.x - end.x);
    var ydiff = Math.abs(start.y - end.y);
    var d = xdiff + ydiff;
    return d;
  }

  neighbors (node) {
    var n = [];
    var x = node.pos.x;
    var y = node.pos.y;
    var grid = map;
    if(grid[x-1] && grid[x-1][y]) {
      n.push(grid[x-1][y]);
    }
    if(grid[x+1] && grid[x+1][y]) {
      n.push(grid[x+1][y]);
    }
    if(grid[x][y-1] && grid[x][y-1]) {
      n.push(grid[x][y-1]);
    }
    if(grid[x][y+1] && grid[x][y+1]) {
      n.push(grid[x][y+1]);
    }
    return n;
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
    const h = 24;
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
    
    this.proponentsWhite = this.add.group();
    this.proponentsWhite.createMultiple(
    {
        key: 'baddies',
        frame: 4,
        setXY: { x: 16, y: 144},
        frameQuantity: 1,
        repeat: 8
    });
    
    this.proponentsBlack = this.add.group();
    this.proponentsBlack.createMultiple(
    {
        key: 'baddies',
        frame: 0,
        setXY: { x: 16, y: 144},
        frameQuantity: 1,
        repeat: this.numberOfAgents - 1
    });



    //prepare bombs
    var bombIndex = 0;
    var bombs = this.bombs.slice();
    this.proponentsWhite.
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
    
    this.setLocations(this.proponentsWhite.getChildren());
    this.setLocations(this.proponentsBlack.getChildren());
    
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
     
    this.stepIndex = 0;  

    //BOMBS
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
    this.player.setVelocity(0);
    
    //cursor handling
    var cursors = this.input.keyboard.createCursorKeys();
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
    var c = this.characters;
    //timed event handling
    this.timer += delta;
    //one px step
    
    while (this.timer > 100) {
      var p = this.proponentsBlack.getChildren();
      this.stepIndex = this.stepIndex + 1;
      
      this.action.walk(p, c, this.stepIndex);
      
      this.timer -= 100; 
      
    };
  }
};

