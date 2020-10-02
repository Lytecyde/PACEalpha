export default class Dialogue {
  constructor () {
    this.talk = "gugu";
    this.labeling();
  };

  negotiationStairway(trust) {
    var responses = [
     "You get me?!", //active listening 5
     "Uhuh, that's what concerns us.", // empathy 5
     "That's right!",//rapport 3
     "Agreed! How can we cooperate on this goal?" //Influence ...settle
    ];

    var responseIndex = trust;

    if(trust > 3) {
      responseIndex = 3;
    }

    if(trust == 10) {
      console.log("I am coming out!");
      //agent switches to gray!!!
    }

    if(trust > 10) {

    }

    console.log("Random AGENT :" + responses[responseIndex]);

    //level4 influence

    //level5 change behaviour
    //the action you proposed
  }

  //1
  mirroring (sentence) {
    //last 1-3 words as a question

  }
  //2
  labeling () {
    //feel like everyfourth line
     var negativeFeelings = [
       //stress
       "tense", "anxious", "worried", "agitated", "strained",
       //fear
       "frightened", "dismayed", "dreading", "paniced", "horrified",
       //sad
        "sad", "despairing", "dismal", "sorrowful", "sorry",
        //angry
        "hostile", "angry", "revengeful", "resentful", "loathing",
        //surprised
        "startled", "shocked", "horrified", "aghast", "stunned",
        //disgust
        "appalled", "nauseated", "disgusted", "repelled", "abhorred",
        //contempt
        "contemptful", "condescending", "derisive", "malicious", "repugnant"
      ];
      var starters = [
        "It looks like you are ",
        "It seems like you are ",
        "It feels like you are ",
        "It sounds like you are "
      ];
      var randomNegativeFeelingNumber =
        Math.floor(Math.random() * negativeFeelings.length);
      var randomStarterNumber =
        Math.floor(Math.random() * starters.length);
      var sentence = "" + starters[randomStarterNumber] +
        negativeFeelings[randomNegativeFeelingNumber];
      console.log("" + sentence);
  }
  //3 get to no
  getNo () {
    //accusation audit and preemptive exhaustion
    var starter = "You may think that I am a ";

    var negativeAdjectives = [

    ];

    //

  }
  //10?
  inviteCorrectionOnSummaries () {
    //questions
    var questionToCorrect = [
      "Am I incorrect in guessing that ...",
      "Is it false to assume that...",
      "Am I wide off the mark here, thinking that ..."
    ];
  }

   paraphrasing () {
    //technique of empathy
  }

  //5trigger that's right that signify rapport
   summariseFeel () {

  }

   summariseWant () {

  }

   reaffirmingFeel () {

  }

   reaffirmingWant () {

  }

  //6
   resistCompromise () {
      //manage fairness

      //deadlines and urgency

      //not accepting is a loss

      //frame conversation to accept your limits
  }

  //7
   guaranteeExecution () {
    //yes test 3 times
  }

  //8
   identifyAndAdapt () {
    //prepare and analyse their negotiation style
  }

  //9
   blackSwans () {
    //position
    //worldview
    //hence what they value and honour and covet and protect and expect...
    //common ground
  }

   activeListening () {
    //rapportpoints++
    //yeah
    //ok
    //hmhm
    //nods
    //browraise
  }

  //analyse and respond to their negotiation technique
};//end of class
