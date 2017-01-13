import {Coord} from './coord'
import {SIZE_GRID_ELEMENT} from "../const/size-grid-element";

export class Snake {
  size: number;
  direction: string;
  isGrowing: boolean;
  body: Coord[];

  constructor() {
    this.moveSnake = this.moveSnake.bind(this);
    this.size = SIZE_GRID_ELEMENT;
    this.body = [];
    this.isGrowing = false;
    this.direction = 'right';
    for (var i = 0; i <= 10; i++) {
      this.body.unshift({x: i * this.size, y: 3 * this.size});
    }
  }

  getSnakeHead () {
    return this.body[0];
  };

  isSnakeCollision (): boolean {
    let snakeBody = this.body.slice();
    return this.body.some(bodyPart => {
      snakeBody.splice(snakeBody.indexOf(bodyPart), 1);
      return snakeBody.some(item => bodyPart.x === item.x && bodyPart.y === item.y);
    });
  }

  moveSnake (): Snake {
    if (!this.isGrowing) {
      this.body.pop(); //Remove tail
    } else {
      this.isGrowing = false;
    }
    let currentHeadSnake = this.getSnakeHead();
    let newHeadSnake;
    if (this.direction === 'left') {
      newHeadSnake = new Coord(currentHeadSnake.x - this.size, currentHeadSnake.y);
    } else if (this.direction === 'right') {
      newHeadSnake = new Coord(currentHeadSnake.x + this.size, currentHeadSnake.y);
    } else if (this.direction === 'up') {
      newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y - this.size);
    } else if (this.direction === 'down') {
      newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y + this.size);
    }
    this.body.unshift(newHeadSnake);
    return this;
  };
}
