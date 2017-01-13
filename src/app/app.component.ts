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
  isGameStarted: boolean;
  isGameOver: boolean;
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;

  constructor(private snakeService: SnakeService){
    this.snake = new Snake();
    this.food = new Food();
    this.title = 'Snake-Angular2';
    this.score = 0;
    this.canvasSize = CANVAS_SIZE;
    this.changeDirectionAllowed = true;
    this.isGameStarted = false;
    this.isGameOver = false;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.snake);
    let gameRunning = setInterval(() => {
      if (this.isGameStarted) {
        this.changeDirectionAllowed = true;
        this.isGameOver = this.snakeService.runGame(this.snake, this.food, this.snakeCanvas.nativeElement.getContext("2d"));
        if (this.isGameOver) {
          clearInterval(gameRunning);
        }
      }
    }, 50);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event) {
    if (this.changeDirectionAllowed) {
      this.snakeService.onKeyUp(event.key, this.snake);
    }
    this.changeDirectionAllowed = false;
  }

  @HostListener('document:click', ['$event'])
  onClick (event) {
    this.isGameStarted = true;
  }


}
