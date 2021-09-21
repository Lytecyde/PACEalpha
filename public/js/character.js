import Path from '../js/path.js';
//import Actor from '../js/actor.js';
import SympathyBar from '../js/sympathybar.js';
export default class Character extends Phaser.GameObjects.Sprite {
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
    sympathy;
    disguise;
    location;
    sprite;
    path; // from dayjob to target
    faction;
    rank; //agent, officer, director 
    proximity;
    style;
    sprite;

    constructor(scene, sprite, x, y) {
        super(scene, x, y, sprite, 0);
        this.setPosition(x, y);
        this.alive = true;    
        scene.add.existing(this);
        this.createPath();
        this.sympathy = new SympathyBar(scene, x, y);
    }

    createPath() {
        this.path = new Path();
        //console.log(this.path);
    }
    
    createMission() {
        this.mission = new Mission();
        this.power = this.mission.power;
        this.weakness = this.mission.weakness;
    }
}