import Resource from '../js/resource.js';
import Path from '../js/path.js';

export default class Character {
    trust;
    life;
    serenity;
    coherence;
    route;
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
    proximity;

    constructor () {
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