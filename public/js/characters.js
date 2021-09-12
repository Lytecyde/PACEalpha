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
    constructor () {
        resource = new Resource(); 
        this.createPath();
    }

    createPath() {
        path = new Path();
    }

}