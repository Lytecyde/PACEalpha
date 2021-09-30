import Character from "../js/character.js";
export default class WhiteSpy extends Character {
  path = [];
  constructor(scene, sprite, x, y) {
    super(scene, x, y, sprite );
    this.path = super.getPath();
    const WHITE = 4;
    //this.sprite.frame = WHITE;
  }
}