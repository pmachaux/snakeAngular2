import { Injectable } from '@angular/core';
import {Snake} from "./snake";
import {Coord} from "./coord";

@Injectable()
export class SnakeService {
  clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, 300, 300)
  }
  drawSnake(ctx: CanvasRenderingContext2D, snake: Snake): void {
    snake.body.forEach(bodyPart => {
      ctx.fillStyle = 'green';
      ctx.fillRect(bodyPart.x*snake.size, bodyPart.y*snake.size, snake.size, snake.size);
      ctx.strokeStyle = 'darkgreen';
      ctx.strokeRect(bodyPart.x*snake.size, bodyPart.y*snake.size, snake.size, snake.size);
    });
  };
  moveSnake(snake: Snake, direction:String): Snake {
    if (direction === 'left') {
      snake.body.pop(); //Remove tail
      let currentHeadSnake = snake.body[0];
      let newHeadSnake = new Coord(currentHeadSnake.x + 1 , currentHeadSnake.y);
      snake.body.unshift(newHeadSnake);
      return snake;
    }
  }
}
