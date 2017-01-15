import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import {SnakeService} from "./snake.service";
import {Snake} from "./model/snake";
import {Coord} from "./model/coord";
import {CANVAS_SIZE} from "./const/canvas-size";
import {Food} from "./model/food";
import {Game} from "./model/game";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [SnakeService],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  canvasSize: Coord;
  changeDirectionAllowed: boolean;
  isGameStarted: boolean;
  game: Game;
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;
  private gameRunning: any;

  constructor(private snakeService: SnakeService){
    this.game = new Game();
    this.title = 'Snake-Angular2';
    this.canvasSize = CANVAS_SIZE;
    this.changeDirectionAllowed = true;
    this.isGameStarted = false;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.game.snake);
    this.startGame();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event) {
    event.preventDefault();
    if (this.changeDirectionAllowed) {
      this.snakeService.onKeyUp(event.key, this.game.snake);
    }
    this.changeDirectionAllowed = false;
  }

  @HostListener('document:click', ['$event'])
  onClick (event) {
    this.isGameStarted = true;
  }

  onLevelChange () {
    this.stopGame();
    this.startGame();
  }

  startGame () {
    this.gameRunning = setInterval(() => {
      if (this.isGameStarted) {
        this.changeDirectionAllowed = true;
        let isGameOver = this.snakeService.runGame(this.game, this.snakeCanvas.nativeElement.getContext("2d"));
        if (isGameOver) {
          this.stopGame();
        }
      }
    }, 250 / this.game.level);
  }

  stopGame () {
    clearInterval(this.gameRunning);
  }
}
