import Helper from './helper.js';

export default class City {
    constructor() {

    };

    createAvenue () {
        var house = [
          [0,0,0,0,3,6,6,3],
          [0,0,0,0,3,2,2,3],
          [0,0,0,0,3,2,2,3],
          [0,4,4,0,3,2,2,3],
          [3,3,3,3,3,6,6,3],
          [1,1,1,1,7,2,2,7],
          [1,1,1,1,7,2,2,7]
        ];
        //TODO park
        //carpark/promenade/square
        return house.concat(house, house);
      };

      
    createCity (scene) {
        var helper = new Helper();
        var avenue = this.createAvenue();
        var level = helper.zipconcat(
        helper.zipconcat(avenue, avenue),
        helper.zipconcat(avenue, avenue));
        const map = scene.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
        const block = scene.make.tilemap({ data : level , tileWidth: 32, tileHeight: 32})
        const tileset = block.addTilesetImage("tiles");
        const layerOfCity = block.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y
        //walk path
        layerOfCity.setCollisionBetween(0, 0);
        return layerOfCity;
      };
}