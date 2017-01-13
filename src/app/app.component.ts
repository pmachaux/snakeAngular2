import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import {SnakeService} from "./snake.service";
import {Snake} from "./model/snake";
import {Coord} from "./model/coord";
import {CANVAS_SIZE} from "./const/canvas-size";
import {Food} from "./model/food";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SnakeService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  score: number;
  canvasSize: Coord;
  changeDirectionAllowed: boolean;
  direction: string;
  snake: Snake;
  food: Food;
  start: boolean;
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;

  constructor(private snakeService: SnakeService){
    this.snake = new Snake();
    this.food = new Food();
    this.title = 'Snake-Angular2';
    this.score = 0;
    this.direction = 'right';
    this.canvasSize = CANVAS_SIZE;
    this.changeDirectionAllowed = true;
    this.start = false;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.snake);
    let gameRunning = setInterval(() => {
      if (this.start) {
        this.changeDirectionAllowed = true;
        this.snakeService.clearCanvas(this.snakeCanvas.nativeElement.getContext("2d"));
        this.snake = this.snakeService.moveSnake(this.snake, this.direction);
        if (this.food.coord === null) {
          this.food = this.snakeService.createFood(this.food, this.snake);
        }
        if (this.food) {
          this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.snake);
          this.snakeService.drawFood(this.snakeCanvas.nativeElement.getContext("2d"), this.food);
        } else {
          clearInterval(gameRunning);
        }
      }
    }, 200);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event) {
    if (this.changeDirectionAllowed) {
      this.direction = this.snakeService.onKeyUp(event.key, this.direction);
    }
    this.changeDirectionAllowed = false;
  }

  @HostListener('document:click', ['$event'])
  onClick (event) {
    this.start = true;
  }


}
