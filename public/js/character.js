import Resource from '../js/resource.js';
import Path from '../js/path.js';
import Actor from '../js/actor.js';
export default class Character extends Actor {
    trust;
    life;

    serenity; // stress vs euphoria
    coherence; // the longer per day you recuperate the more resilient to stress  
     
    power; //what MIICE power one has 
    weakness; //what MIICE one wants
    resource; 
    plan;
    armed;
    alignment;
    disguise;
    location;
    sprite;
    path; // from dayjob to target

    rank; //agent
    proximity;
    style;

    constructor (scene, side, x, y) {
        //resource = new Resource(); 
        this.createPath();
    }

    createPath() {
        this.path = new Path();
        console.log(this.path);
    }
    
    createMission() {
        this.mission = new Mission();
        this.power = this.mission.power;
        this.weakness = this.mission.weakness;
    }
}