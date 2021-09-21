export default class Actor extends Phaser.GameObjects.Sprite {
  
    constructor (scene, sprite, faction, x, y) {
        super(scene, x, y, sprite, 0);
        this.faction = faction;
        this.setPosition(x, y);
        this.alive = true;
        //scene.add.existing(this);
     
        
        this.sympathy = new SympathyBar(scene, x, y);
    }

    //preUpdate (time, delta) {
    //    super.preUpdate(time, delta);
    //}

    action() {

    }
    
}