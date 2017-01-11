import {Coord} from './coord'

export class Snake {
  size: number;
  body: Coord[];

  constructor() {
    this.size = 10;
    this.body = [];
    for (var i = 0; i<=10; i++) {
      this.body.unshift({x: i * this.size, y:25});
    }
  }
}
