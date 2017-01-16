import {Snake} from "./snake";
import {Food} from "./food";
export class Game{
  snake: Snake;
  food: Food;
  score: number;
  highestScore: number;
  level: number;
  isGameOver: boolean;

  constructor (level: number, highestScore: number) {
    this.snake = new Snake();
    this.food = new Food();
    this.score = 0;
    this.level = level;
    this.highestScore = highestScore;
    this.isGameOver = false;
  }

  setNewHighestScore () : number {
    if (this.score > this.highestScore) {
      this.highestScore = this.score;
    }
    return this.highestScore;
  }
}
