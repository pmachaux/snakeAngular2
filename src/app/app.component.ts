import {Component, ViewChild, ElementRef} from '@angular/core';
import {SnakeService} from "./snake-service.service";
import {Snake} from "./snake";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SnakeService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Snake-Angular2';
  score = 0;
  direction = 'left';
  snake: Snake;
  // get the element with the #chessCanvas on it
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;

  constructor(private snakeService: SnakeService){
    this.snake = new Snake();
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.snake);
   setInterval(() => {
     this.snakeService.clearCanvas(this.snakeCanvas.nativeElement.getContext("2d"));
      this.snake = this.snakeService.moveSnake(this.snake, this.direction);
      this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.snake);
    }, 1000);
  }
}
