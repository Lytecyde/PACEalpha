export default class Dialogue {
  constructor () {
    this.talk = "gugu";
  };

  randomChoice(length) {
    return Math.floor(Math.random() * length);
  }

  negotiationStairway(trust) {
    var responses = [
     "You get me?!", //active listening 5
     "Uhuh, that's what concerns us.", // empathy 5
     "That's right!",//rapport 3
     "Agreed! I think I have a plan, we can cooperate on this goal?" //Influence ...settle
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

  //Silence
  silence(){
    var responses = [
      "Hmh...",
      "Uhuh",
      "Yes!",
      "OK!",
      "Yeah!",
      "(nod)",
      "(raised eyebrow)",
      "(lean forward)",
      "Exactly...",
      "I see...",
      "I hear you"
    ];
    var response = responses[this.randomChoice(responses.length)];
    document.getElementById('reply').value = response;
  };

  //1
  mirroring (sentence) {
    //last 1-3 words as a question
    //TODO requires proponent to relate and chatter and maybe even lie
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
        //surprise
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

      var objectsOfFeelings = [
        "an officer",
        "an opponent",
        "a team",
        "a traitor",
        "a whistleblowers",
        "the work",
        "the terror"
      ];

      var object =
      objectsOfFeelings[this.randomChoice(objectsOfFeelings.length)];
      var inquiryLabelingFeelings =
       starters[this.randomChoice(starters.length)] +
       negativeFeelings[this.randomChoice(negativeFeelings.length)] +
       " about " +
       object +
       "...?";

      document.getElementById('reply').value = inquiryLabelingFeelings;

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
