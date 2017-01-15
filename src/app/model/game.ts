import {Snake} from "./snake";
import {Food} from "./food";
export class Game{
  snake: Snake;
  food: Food;
  score: number;
  level: number;
  isGameOver: boolean;
  constructor () {
    this.snake = new Snake();
    this.food = new Food();
    this.score = 0;
    this.level = 1;
    this.isGameOver = false;
  }
}
