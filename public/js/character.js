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
    
    path = []; // from dayjob to target
    faction;
    rank; //agent, officer, director 
    proximity;
    style;

    constructor(scene, sprite, x, y) {
        super(scene, x, y, sprite, 0);
        this.setPosition(x, y);
        this.alive = true;    
        scene.add.existing(this);
        this.createPath();
    }

    createPath() {
        let p = new Path();
        console.log("path created" + p.getPath());
        this.path = p.getPath();
        //console.log("created a path");
    }

    getPath() {
        return this.path;
    }
}