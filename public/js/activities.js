import Dialogue from '../js/dialogue.js';
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
      console.log("walking" + spies[0]);
      
      spies.forEach(spy => { 
        console.log("spy x" + spy.x);
          var p = [];
          p = spy.path;
          console.log("p" + p);
          if(p.length > 1 ){//
            console.log("spies array 0 x" + spy.path[0].x);
            var step = stepIndex % p.length;
            var x = p[step].x;
            var y = p[step].y;
          }
          spy.setPosition(x , y);
          spy.setOrigin(0, 0);
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
          //console.log('blah blah blah');
    
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