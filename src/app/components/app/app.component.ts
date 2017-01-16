import {Component, ViewChild, ElementRef, HostListener} from '@angular/core';
import {SnakeService} from "../../service/snake.service";
import {Coord} from "../../model/coord";
import {CANVAS_SIZE} from "../../const/canvas-size";
import {Game} from "../../model/game";

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
  isGameRunning: boolean;
  isNewGame: boolean;
  game: Game;
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;
  private gameRunning: any;

  constructor(private snakeService: SnakeService){
    this.game = new Game(1, 0);
    this.title = 'Snake-Angular2';
    this.canvasSize = CANVAS_SIZE;
    this.changeDirectionAllowed = true;
    this.isGameRunning = false;
    this.isNewGame = true;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.game.snake);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event) {
    if (event.code === 'Space') {
      if (this.isGameRunning) {
        this.changeDirectionAllowed = false;
        this.stopGame();
      } else {
        this.changeDirectionAllowed = true;
        this.startGame();
      }
    } else if (this.changeDirectionAllowed) {
      this.changeDirectionAllowed = !this.snakeService.onKeyUpChangeDirection(event.key, this.game.snake);
    }
  }

  onStartClicked () {
    this.startGame();
    this.isNewGame = false;
  }

  onLevelChange () {
    if (this.isGameRunning) {
      this.stopGame();
      this.startGame();
    }
  }

  startGame () {
    this.isGameRunning = true;
    this.gameRunning = setInterval(() => {
      this.changeDirectionAllowed = true;
      let isGameOver = this.snakeService.runGame(this.game, this.snakeCanvas.nativeElement.getContext("2d"));
      if (isGameOver) {
        this.stopGame();
        let highestScore = this.game.setNewHighestScore();
        this.game = new Game(this.game.level, highestScore);
        this.isNewGame = true;
      }
    }, 250 / this.game.level);
  }

  stopGame () {
    this.isGameRunning = false;
    clearInterval(this.gameRunning);
  }
}
