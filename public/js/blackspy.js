import Character from "../js/character.js";

export default class BlackSpy extends Character {
  path = [];
  constructor(scene, sprite, x, y) {
    super(scene, x, y, sprite );
    this.path = super.getPath();
    const BLACK = 0;
    //this.sprite.frame = BLACK;
  }
}