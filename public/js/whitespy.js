import Character from "../js/character.js";

export default class WhiteSpy extends Character {
  sprite;
  constructor(scene, sprite, x, y) {
    super(scene, x, y, sprite );
    this.sprite = scene.add.sprite(x, y, 'baddies', 4);
    
    const WHITE = 4;
    //this.sprite.frame = WHITE;
    
  }
}