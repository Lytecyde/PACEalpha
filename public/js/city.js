'use strict'
import Helper from './helper.js';

export default class City {
    avenue = [];
    city = [];
    constructor() {
        this.createCity();
    };

    createAvenue () {
      var house = [
        [3,3,3,3,3,6,6,3],
        [0,0,0,0,3,2,2,3],
        [0,0,0,0,3,2,2,3],
        [0,0,0,0,3,2,2,3],
        [0,4,4,0,3,2,2,3],
        [3,3,3,3,3,6,6,3],
        [1,1,1,1,7,8,8,7],
        [1,1,1,1,7,8,8,7]
      ];

      var promenade = [
        [3,3,3,3,3,6,6,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [9,9,9,9,3,2,2,3],
        [3,3,3,3,3,6,6,3],
        [1,1,1,1,7,8,8,7],
        [1,1,1,1,7,8,8,7]
      ];
      
      //TODO park
      //carpark/promenade/square
      
      var rowsinhouse = 8;
      var avenue = [];
      
      var a = [];
      var randomBlock = Math.floor(Math.random() * 4 ); 
      for ( var j = 0; j < rowsinhouse; j++) {
        //console.log(avenue);
        //TODO: makeBlocks () {};
        var b = []
        for (let i = 0; i < 4; i++) {
          b[i] = randomBlock == i ? promenade[j]: house[j];  
        };

        var block = [
          b[0],
          b[1],
          b[2],
          b[3],
        ];

        a = a.concat(block[0], block[1], block[2], block[3]);

      }
      avenue = avenue.concat(a);
      this.avenue = avenue.slice();
      
      return avenue;
    };

    createCity() {
      var avenue = this.createAvenue();
      var avenues = 3;

      var city = [];
      console.log(this.avenue);
      for (var i = 0; i < avenues; i++) {   
        city = city.concat(avenue);
        avenue = this.createAvenue();
      }
      this.city = city.slice();
    }

    getLevel() {
      console.log("city "  + this.city);
      return this.city;
    }
}