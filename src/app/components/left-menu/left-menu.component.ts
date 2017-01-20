import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
import {Game} from "../../model/game";
import {SnakeService} from "../../service/snake.service";
@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  providers: [],
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent implements OnInit {
 game: Game;
 level: number;
 constructor(private snakeService: SnakeService) {
 }

  ngOnInit(): void {
    this.snakeService.getGame().subscribe(game => {
      this.game = game;
      this.level = this.game.level;
    });
  }

  onLevelChange () {
   this.snakeService.onLevelChange(this.level);
  }
}
