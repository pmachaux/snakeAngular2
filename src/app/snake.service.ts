import { Injectable } from '@angular/core';
import {Snake} from "./model/snake";
import {Coord} from "./model/coord";
import {KEY_DIRECTION_ARRAY} from "./const/key-direction-array";
import {CANVAS_SIZE} from "./const/canvas-size";

@Injectable()
export class SnakeService {
  clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y)
  };
  detectBorderCanvas(size: number, abscisse: number, ordonnee: number) : Coord {
    if (abscisse >= CANVAS_SIZE.x) {
      abscisse = 0;
    } else if (abscisse < 0) {
      abscisse = CANVAS_SIZE.x - size;
    }
    if (ordonnee >= CANVAS_SIZE.y) {
      ordonnee = 0;
    } else if (ordonnee < 0) {
      ordonnee = CANVAS_SIZE.y - size;
    }
    return new Coord(abscisse, ordonnee);
  };
  drawSnake(ctx: CanvasRenderingContext2D, snake: Snake): void {
    snake.body.forEach((bodyPart, index) => {
      let colorBody = index === 0 ? 'red' : 'green';
      ctx.fillStyle = colorBody;
      ctx.fillRect(bodyPart.x, bodyPart.y, snake.size, snake.size);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(bodyPart.x, bodyPart.y, snake.size, snake.size);
    });
  };
  moveSnake(snake: Snake, direction:String): Snake {
      snake.body.pop(); //Remove tail
      let currentHeadSnake = snake.body[0];
      let newHeadSnake;
      if (direction === 'left') {
        newHeadSnake = new Coord(currentHeadSnake.x - snake.size, currentHeadSnake.y);
      } else if (direction === 'right') {
        newHeadSnake = new Coord(currentHeadSnake.x + snake.size, currentHeadSnake.y);
      } else if (direction === 'up') {
        newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y - snake.size);
      } else if (direction === 'down') {
        newHeadSnake = new Coord(currentHeadSnake.x, currentHeadSnake.y + snake.size);
      }
      snake.body.unshift(newHeadSnake);
      snake.body = snake.body.map(bodyPart => this.detectBorderCanvas(snake.size, bodyPart.x, bodyPart.y));
      return snake;
  };
  onKeyUp(eventKey: string, direction: string): string {
    let requestedKey = KEY_DIRECTION_ARRAY.find(item => item.key === eventKey);
    if (requestedKey && requestedKey.opposite !== direction) {
      direction = requestedKey.direction;
    }
    return direction;
  }
}
