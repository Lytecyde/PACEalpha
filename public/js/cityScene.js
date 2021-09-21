import City from '../js/city.js';
//import LevelMap from '../js/levelmap.js';
import Activities from '../js/activities.js';
import Character from '../js/character.js';
import Helper from '../js/helper.js';
import WhiteSpy from '../js/whitespy.js';
import BlackSpy from '../js/blackspy.js';
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
  spiesBlack;
  spiesWhite;
  paths = [];
  legalPaths = [];
  level = [];
  n;
  charactersWhite = [];
  charactersBlack = [];
  stepIndex;
  numberOfAgents;
  proximity;
  sprite;
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
    this.numberOfAgents = 6; //max 12 locations.length on max
    /*
    for (let index = 0; index < this.numberOfAgents; index++) {
      var cb = new Character(this, sprite, 0, 0);
      var cw = new Character(this, sprite, 0, 0);
      if (!(cb.path.length < 2) ||
        !(cw.path.length < 2)) {
        this.charactersWhite.push(cb);
        this.charactersBlack.push(cw);
      }
      else continue;
    }
    */
    this.stepIndex = 0;
  };
  //TODO: refactor into locations.js or agents...
  makeLocations () {
    const WIDTH = 32;
    const HEIGHT = 24;
    const allDoors = 
      [{x:4, y:4}, {x:12, y:4}, {x:20, y:4},  {x:28, y:4},
      {x:4, y:12}, {x:12, y:12},{x:20, y:12}, {x:28, y:12},
      {x:4, y:20}, {x:12, y:20},{x:20, y:20}, {x:28, y:20}]
    ;
    
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

    this.player = this.physics.add.sprite(32 * 4 + 16, 16, 'spygray-right', 0);
    this.player.setCollideWorldBounds(true);
    
    this.proximity = false;
   
    /*
      adding spies to groups
    */
    this.sprite = this.add.sprite(0, 0, 'baddies',4);
    this.spiesWhite = this.add.group();
    
    for (let index = 0; index < this.numberOfAgents; index++) {
      this.spy = new WhiteSpy(this, this.sprite, 0, 0);
      this.sprite.frame = 4;
      this.spiesWhite.create(this.spy);
    }
    
    this.spiesBlack = this.add.group();
    this.sprite = this.add.sprite(0, 0, 'baddies',0);
    for (let index = 0; index < this.numberOfAgents; index++) {
      this.spy = new BlackSpy(this, this.sprite, 0, 0);
      this.sprite.frame = 0;
      this.spiesBlack.create(this.spy);
    }

    this.setLocations(this.spiesWhite.getChildren());
    this.setLocations(this.spiesBlack.getChildren());
    
    this.physics.add.existing(this.player);

    this.physics.add.collider(this.player, layer);

    mapCity.setCollisionBetween(0, 0);

    
    /*
    this.input.once('pointerdown', function (event) {
        console.log('From SceneB_CityView to SceneC');
        this.scene.start('sceneC');
    }, this);
    */
    
    this.stepIndex = 0;  

    
    //this.physics.add.overlap(this.proponentsBlack, this.proponentsWhite, this.action.convert);
    //this.physics.add.overlap(this.proponentsBlack, this.proponentsWhite, this.action.convert());
    this.physics.add.overlap(this.player, this.spiesWhite, this.action.pacify());

    //this.physics.add.collider(this.player, this.proponentsWhite);
    //this.physics.add.collider(this.player, this.proponentsBlack);

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
    //var cb = this.charactersBlack;
    //var cw = this.charactersWhite;
    //timed event handling
    this.timer += delta;
    //one px step
     
    var pblack = this.spiesBlack.getChildren();
    var pwhite = this.spiesWhite.getChildren();

    var spyblackindex = 0;
    pblack.forEach(spyblack => {
      if(this.checkOverlap(this.player, spyblack)
        && !this.proximity
      ) {
        this.proximity == true;
        console.log("peace good to black");
        spyblack.destroy();
        this.spiesBlack.createMultiple({
            key: 'baddies',
            frame: 2, //GRAY color
            setXY: { x: spyblack.x, y: spyblack.y},
            frameQuantity: 1,
            repeat: 0
        });
        if(this.charactersBlack.length > 0) {
          this.charactersBlack.splice(spyblackindex,1);
        }
        this.proximity = false;
      }
      spyblackindex++;
    });

    var spywhiteindex = 0;
    pwhite.forEach(spywhite => {
      if(this.checkOverlap(this.player, spywhite)
        && !this.proximity
      ) {
        this.proximity = true;
        console.log("peace goodness to white");
        spywhite.destroy();
        this.spiesWhite.createMultiple({
            key: 'baddies',
            frame: 2, //GRAY color
            setXY: { x: spywhite.x, y: spywhite.y},
            frameQuantity: 1,
            repeat: 0
        });
        if(this.charactersWhite.length > 0) {
          this.charactersWhite.splice(spywhiteindex,1);
        }
        this.proximity = false;
      }
      spywhiteindex++;
    });

    while (this.timer > 700) {
      var pblack = this.spiesBlack.getChildren();
      var pwhite = this.spiesWhite.getChildren();
      
      this.stepIndex = this.stepIndex + 1;
      
      this.action.walk(pblack, this.stepIndex);
      this.action.walk(pwhite, this.stepIndex);
      
      //this.action.near(pwhite, pblack, this.physics, this);
      this.timer -= 700; 
      
    };
    
  }

  checkOverlap(spriteA, spriteB) {
    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  isClose() {
    
    console.log("peace! " + this.player.x + " " + this.player.y)
    this.proximity = true;
  }
};


