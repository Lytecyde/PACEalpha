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

    walk (spies, stepIndex) {
      //one step for each spy
      var index = 0;
      spies.forEach(spy => { 
        if(spies[index] != null){
          var p = spy.path;
          if(p.length > 0){
            var step = stepIndex % p.length;
            var x = p[step].x;
            var y = p[step].y;
          }
          spy.setPosition(x * 32, y * 32);
          spy.setOrigin(0, 0);
          index++;
        }
      });
    };
    
    convert(){
      console.log("convert");
    }

    pacify() {
      console.log("Peace!");
    }

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