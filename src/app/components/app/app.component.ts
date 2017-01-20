import {Component, ViewChild, ElementRef, HostListener, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
  title: string;
  canvasSize: Coord;
  changeDirectionAllowed: boolean;
  isNewGame: boolean;
  game: Game;
  runGamePeriodically: any;
  @ViewChild("snakeCanvas") snakeCanvas: ElementRef;

  constructor(private snakeService: SnakeService){
  }

  ngOnInit(): void {
    this.snakeService.getGame().subscribe(game => {
      this.game = game;
    });
    this.title = 'Snake-Angular2';
    this.canvasSize = CANVAS_SIZE;
    this.changeDirectionAllowed = true;
    this.isNewGame = true;
  }

  ngAfterViewInit() { // wait for the view to init before using the element
    this.snakeService.drawSnake(this.snakeCanvas.nativeElement.getContext("2d"), this.game.snake);
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp (event) {
    if (event.code === 'Space') {
      if (this.game.isRunning) {
        this.changeDirectionAllowed = false;
        this.stopGame();
      } else if (!this.isNewGame) {
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

  startGame () {
    this.game.isRunning = true;
    this.runGamePeriodically = setInterval(() => {
      this.changeDirectionAllowed = true;
      let isGameOver = this.snakeService.nextGameAction(this.snakeCanvas.nativeElement.getContext("2d"));
      if (isGameOver) {
        this.stopGame();
        let highestScore = this.game.setNewHighestScore();
        this.snakeService.pushGameUpdate(new Game(this.game.level, highestScore));
        this.isNewGame = true;
      }
    }, 350 / this.game.level);
  }

  stopGame () {
    this.game.isRunning = false;
    clearInterval(this.runGamePeriodically);
  }
}
