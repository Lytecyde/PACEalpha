export default class Astar {
    
  constructor () {
    
  }

  init(grid) {
      for(var x = 0; x < grid.length; x++) {
        for(var y = 0; y < grid[x].length; y++) {
          grid[x][y].f = 0;
          grid[x][y].g = 0;
          grid[x][y].h = 0;
          grid[x][y].debug = "";
          grid[x][y].parent = null;
        }  
      }
    }

    search(grid, start, end) {
      astar.init(grid);
    
      var openList   = []; 
      var closedList = []; //path from start to end
      openList.push(start);
    
      while(openList.length > 0) {
        // Grab the lowest f(x) to process next
        var lowInd = 0;
        for(var i = 0; i < openList.length; i++) {
          if(openList[i].f < openList[lowInd].f) { lowInd = i; }
        }
        var currentNode = openList[lowInd];
        
        // End case -- result has been found, return the traced path
        if(currentNode.position == end.position) {
          var curr = currentNode;
          var tracedPath = [];
          while(curr.parent) {
            tracedPath.push(curr);
            curr = curr.parent;
          }
          return tracedPath.reverse();
        }
    
        /**
         *   Normal case -- move currentNode from open to closed, 
         *   process each of its neighbors
        */ 
        openList.splice(currentNode, 1);
        closedList.push(currentNode);
        
        var neighbors = this.findNeighbors(grid, currentNode);
    
        for(var i = 0; i < neighbors.length;i++) {
          var neighbor = neighbors[i];
          if(closedList.includes(neighbor) || astar.isBuilding(neighbor)) {
            // not a valid node to process, skip to next neighbor
            continue;
          }
    
          // g score is the shortest distance from start to current node, we need to check if
          //  the path we have arrived at this neighbor is the shortest one we have seen yet
          var gScore = currentNode.g + 1; // 1 is the distance from a node to it's neighbor
          var gScoreIsBest = false;
    
          if(!openList.includes(neighbor)) {
            // This the the first time we have arrived at this node, it must be the best
            // Also, we need to take the h (heuristic) score since we haven't done so yet
    
            gScoreIsBest = true;
            neighbor.h = astar.manhattanDistance(neighbor.position, end.position);
            openList.push(neighbor);
          }
          else if(gScore < neighbor.g) {
            // We have already seen the node, but last time it had a worse g (distance from start)
            gScoreIsBest = true;
          }
    
          if(gScoreIsBest) {
            // Found an optimal (so far) path to this node.   Store info on how we got here and
            //  just how good it really is...
            neighbor.parent = currentNode;
            neighbor.g = gScore;
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.debug = "F: " + neighbor.f + "<br />G: " + neighbor.g + "<br />H: " + neighbor.h;
          }
        }
      }
    
      // No result was found -- empty array signifies failure to find path
      return [];
    }
    //heuristic
    manhattanDistance(position0, position1) {
      
      var d1 = Math.abs (position1.x - position0.x);
      var d2 = Math.abs (position1.y - position0.y);
      return d1 + d2;
    }

    findNeighbors(grid, node) {
      var neighbors = [];
      var x = node.position.x;
      var y = node.position.y;
    
      if(grid[x-1] && grid[x-1][y]) {
        neighbors.push(grid[x-1][y]);
      }
      if(grid[x+1] && grid[x+1][y]) {
        neighbors.push(grid[x+1][y]);
      }
      if(grid[x][y-1] && grid[x][y-1]) {
        neighbors.push(grid[x][y-1]);
      }
      if(grid[x][y+1] && grid[x][y+1]) {
        neighbors.push(grid[x][y+1]);
      }
      return neighbors;
    }

    isBuilding(neighbor) {
      return neighbor === /* tile.BUILDING code */ 3;
    }
  }; 