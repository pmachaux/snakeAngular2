import {Coord} from './coord'
import {SIZE_GRID_ELEMENT} from "../const/size-grid-element";

export class Snake {
  size: number;
  body: Coord[];

  constructor() {
    this.moveSnake = this.moveSnake.bind(this);
    this.size = SIZE_GRID_ELEMENT;
    this.body = [];
    for (var i = 0; i <= 10; i++) {
      this.body.unshift({x: i * this.size, y:30});
    }

  }

  moveSnake (direction: String): Snake {
    this.body.pop(); //Remove tail
     let currentHeadSnake = this.body[0];
     let newHeadSnake;
     if (direction === 'left') {
     newHeadSnake = new Coord(currentHeadSnake.x - this.size, currentHeadSnake.y);
     } else if (direction === 'right') {
     newHeadSnake = new Coord(currentHeadSnake.x + this.size, currentHeadSnake.y);
     } else if (direction === 'up') {
     newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y - this.size);
     } else if (direction === 'down') {
     newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y + this.size);
     }
     this.body.unshift(newHeadSnake);
    return this;
  }
}
