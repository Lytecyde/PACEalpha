import Dialogue from '../js/dialogue.js';
import Character from '../js/character.js';
export default class Activities {
    routes = [];
    talking;
    proximity;
    constructor () {

    }

    talk () {
        //increase like points
        //increase coherence level points
        //only when meeting
      this.parlay();
    }

    action () {
        //bomb/shoot/.../coherencecam/disguise/getaway?
        //
    }

    walk (proponents, characters, stepIndex) {
      //one step for each spy
      var index = 0;
      proponents.forEach(spy => { 
        
        var p = characters[index].path;
        if(p.length > 0){
          var step = stepIndex % p.length;
          var x = p[step].x;
          var y = p[step].y;
        }
        spy.setPosition(x * 32, y * 32);
        spy.setOrigin(0, 0);
        index++;
      });

    };
      /* talk when near
        proponents.forEach(spy => {
           this.physics.add.overlap(
            player,
            spy,
            this.parlay,
            null,
            scene
          ); 
        });
      */ 
     
      
    



    parlay () {
        //cut talk if not close
        if (!proximity) {
            talking = false;
            return ;
        }
        //TALK options 💬
        if (!talking && proximity) {
          //console.log('tralalalala');
    
          var dialogue = new Dialogue();
    
          document.getElementById('silence').onclick = function(){
            dialogue.silence();
          };
    
          document.getElementById('labeling').onclick = function(){
            dialogue.labeling();
            trust += 1;
            dialogue.negotiationStairway(trust);
          };
          talking = true;
        };
    
    
    }
}