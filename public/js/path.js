import Astar from '../js/astar_mik.js';

export default class Path {
    //all starts
    allDoors = [
        [{x:4, y:4}, {x:12, y:4}, {x:20, y:4},  {x:28, y:4}],
        [{x:4, y:12}, {x:12, y:12},{x:20, y:12}, {x:28, y:12}],
        [{x:4, y:20}, {x:12, y:20},{x:20, y:210}, {x:28, y:20}]  
    ];

    roadLength;

    constructor () {
        var start = this.createRandomRoutePosition();
        var end = this.createRandomRoutePosition();
        this.roadLength = this.getPathLength(start, end);
        console.log("path length " + this.roadLength);
        var path = this.makePath(start, end);
        return path;
    }

    createRandomRoutePosition() {
        const housesPerStreet = 3;
        const housesPerAvenue = 4;
        var startHouseX = Math.floor(Math.random() * housesPerAvenue);
        var startHouseY = Math.floor(Math.random() * housesPerStreet);
        var position = this.allDoors[startHouseY][startHouseX];
        return position;
    }

    getPathLength(start, end) {
        var manhattanDistanceX = Math.abs(start.x - end.x);
        var manhattanDistanceY = Math.abs(start.y - end.y);
        return manhattanDistanceX + manhattanDistanceY;
    }

    makePath(start, end) {
        var path = [];

        var dx = Math.abs(start.x - end.x);
        var dy = Math.abs(start.y - end.y);
        console.log("start x, y" + start.x + "  " + start.y);
        console.log("end x, y" + end.x + " " + end.y);
        
        //moving along the x axis
        for (let x = 0; x < dx; x++) {    
            var next = {x:(start.x - (Math.sign(start.x - end.x) * x)), y:start.y + 1}; 
            path.push(next);
        }
        //moving along y axis
        for (let y = 0; y < dy; y++) {    
            var next = {
                x:(end.x),
                y:(start.y + 1 - (Math.sign(start.y - end.y) * y ))
            }; 
            path.push(next);
        }

        path.push(end);
        console.log("path " + path);
        var pathToEnd = path.slice();
        var pathToStart = path.reverse();
        var roundpath = pathToEnd.concat(pathToStart);
        console.log("roundpath" + roundpath);
        return roundpath;
    }
}