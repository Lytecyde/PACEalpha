'use strict'
import Helper from './helper.js';

export default class City {
    avenue = [];
    city = [];
    constructor() {
        this.createCity();
    };

    createCity () {
      var house = [
        [3,3,3,3,3,6,6,3],
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
      var avenues = 3;
      var rowsinhouse = 8;
      var avenue = [];
      var city = [];
      var r = [];
      for ( var j = 0; j < rowsinhouse; j++) {
        //console.log(avenue);
        r = r.concat(house[j], house[j], house[j], house[j]);
      }
      avenue = avenue.concat(r);
      this.avenue = avenue.slice();
      
      console.log(this.avenue);
      for (var i = 0; i < avenues; i++) {   
        city = city.concat(avenue);
      }
      this.city = city.slice();
    };

    getLevel() {
      console.log("city "  + this.city);
      return this.city;
    }
}