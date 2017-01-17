import { Injectable } from '@angular/core';
import {Snake} from "../model/snake";
import {Coord} from "../model/coord";
import {KEY_DIRECTION_ARRAY} from "../const/key-direction-array";
import {CANVAS_SIZE} from "../const/canvas-size";
import {Food} from "../model/food";
import {Game} from "../model/game";
import {SNAKE_DIRECTION} from "../const/snake-direction";

@Injectable()
export class SnakeService {
  clearCanvas(ctx: CanvasRenderingContext2D): void {
    ctx.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y)
  };
  changeFoodPosition (food: Food, snake: Snake): Food {
    food.coord = food.generateFoodPositionRandomly(CANVAS_SIZE, snake.body);
    return food;
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
  drawFood(ctx: CanvasRenderingContext2D, food:Food) {
    ctx.fillStyle = 'yellow';
    ctx.fillRect(food.coord.x, food.coord.y, food.size, food.size);
    ctx.strokeStyle = 'purple';
    ctx.strokeRect(food.coord.x, food.coord.y, food.size, food.size);
  }
  drawSnake(ctx: CanvasRenderingContext2D, snake: Snake): void {
    snake.body.forEach((bodyPart, index) => {
      let colorBody = 'green';
      if (index === snake.body.length -1) {
        this.drawSnakeTail(bodyPart, snake.getTailDirection(), snake.size, ctx)
      } else if (index === 0 ) {
        this.drawSnakeHead(bodyPart, snake.direction, snake.size, ctx);
      } else {
        ctx.fillStyle = colorBody;
        ctx.fillRect(bodyPart.x, bodyPart.y, snake.size, snake.size);
        ctx.strokeStyle = 'darkgreen';
        ctx.strokeRect(bodyPart.x, bodyPart.y, snake.size, snake.size);
      }
    });
  };
  drawSnakeHead(headCoord: Coord, snakeDirection: string, size: number, ctx: CanvasRenderingContext2D) {
    let centerCoord = new Coord(headCoord.x + size/2, headCoord.y + size/2);
    let startAngle;
    let endAngle;
    let startCoord;
    let firstLineCoord;
    let secondLineCoord;
    if (snakeDirection === SNAKE_DIRECTION.RIGHT) {
      startCoord = new Coord(headCoord.x, headCoord.y);
      firstLineCoord = new Coord(headCoord.x + size/2, headCoord.y);
      secondLineCoord = new Coord(headCoord.x, headCoord.y  + size);
      startAngle = -Math.PI / 2;
      endAngle = Math.PI / 2;
    } else if (snakeDirection === SNAKE_DIRECTION.LEFT) {
      startCoord = new Coord(headCoord.x + size, headCoord.y + size);
      firstLineCoord = new Coord(headCoord.x + size/2, headCoord.y + size);
      secondLineCoord = new Coord(headCoord.x + size, headCoord.y );
      startAngle = Math.PI / 2;
      endAngle = Math.PI * 3 / 2;
    }
    else if (snakeDirection === SNAKE_DIRECTION.UP) {
      startCoord = new Coord(headCoord.x, headCoord.y + size );
      firstLineCoord = new Coord(headCoord.x , headCoord.y + size / 2);
      secondLineCoord = new Coord(headCoord.x + size, headCoord.y + size);
      startAngle = Math.PI ;
      endAngle = 0;
    }
    else {
      startCoord = new Coord(headCoord.x + size, headCoord.y);
      firstLineCoord = new Coord(headCoord.x + size , headCoord.y + size / 2);
      secondLineCoord = new Coord(headCoord.x , headCoord.y);
      startAngle =  0;
      endAngle = Math.PI;
    }

    ctx.beginPath();
    ctx.moveTo(startCoord.x, startCoord.y);
    ctx.lineTo(firstLineCoord.x, firstLineCoord.y);
    ctx.arc(centerCoord.x, centerCoord.y, size/2, startAngle, endAngle, false);
    ctx.lineTo(secondLineCoord.x, secondLineCoord.y);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.strokeStyle = 'darkred';
    ctx.stroke();
    ctx.closePath();
  };
  drawSnakeTail (tailCoord: Coord, tailDirection: string, size: number, ctx: CanvasRenderingContext2D) {
    let startCoord;
    let middleCoord;
    let endCoord;
    if (tailDirection === SNAKE_DIRECTION.RIGHT) {
      startCoord = new Coord(tailCoord.x + size, tailCoord.y);
      middleCoord =  new Coord(tailCoord.x, tailCoord.y + size/2);
      endCoord =  new Coord(tailCoord.x + size, tailCoord.y + size);
    } else if (tailDirection === SNAKE_DIRECTION.LEFT) {
      startCoord = new Coord(tailCoord.x , tailCoord.y);
      middleCoord =  new Coord(tailCoord.x + size, tailCoord.y + size/2);
      endCoord =  new Coord(tailCoord.x, tailCoord.y + size);
    }
    else if (tailDirection === SNAKE_DIRECTION.UP) {
      startCoord = new Coord(tailCoord.x, tailCoord.y);
      middleCoord =  new Coord(tailCoord.x + size/2, tailCoord.y + size);
      endCoord =  new Coord(tailCoord.x + size, tailCoord.y);
    }
    else {
      startCoord = new Coord(tailCoord.x, tailCoord.y + size);
      middleCoord =  new Coord(tailCoord.x + size/2, tailCoord.y);
      endCoord =  new Coord(tailCoord.x + size, tailCoord.y + size);
    }
    ctx.beginPath();
    ctx.moveTo(startCoord.x, startCoord.y);
    ctx.lineTo(middleCoord.x, middleCoord.y);
    ctx.lineTo(endCoord.x, endCoord.y);
    ctx.fillStyle = 'green';
    ctx.fill();
    ctx.closePath();
  }
  isSnakeEatingFood (snake: Snake, food: Food): boolean {
    let snakeHead = snake.getSnakeHead();
    return food.coord && snakeHead.x === food.coord.x && snakeHead.y === food.coord.y;
  };
  moveSnake(snake: Snake): Snake {
    snake = snake.moveSnake();
    snake.body = snake.body.map(bodyPart => this.detectBorderCanvas(snake.size, bodyPart.x, bodyPart.y));
    return snake;
  };
  onKeyUpChangeDirection(eventKey: string, snake: Snake): boolean {
    let isDirectionChanged = false;
    let requestedKey = KEY_DIRECTION_ARRAY.find(item => item.key === eventKey);
    if (requestedKey && requestedKey.opposite !== snake.direction) {
      snake.direction = requestedKey.direction;
      isDirectionChanged= true;
    }
    return isDirectionChanged;
  };
  runGame(game: Game, ctx: CanvasRenderingContext2D): boolean {
    this.clearCanvas(ctx);
    this.moveSnake(game.snake);
    game.isGameOver = game.snake.isSnakeCollision();
    game.snake.isGrowing = this.isSnakeEatingFood(game.snake, game.food);
    if (game.snake.isGrowing) {
      game.food.coord = null;
      game.score = game.score + game.level*10;
    }
    if (!game.food.coord) {
      this.changeFoodPosition(game.food, game.snake);
    }
    if (game.food) {
      this.drawSnake(ctx, game.snake);
      this.drawFood(ctx, game.food);
    } else {
      game.isGameOver = true;
    }
    return game.isGameOver;
  }
}
