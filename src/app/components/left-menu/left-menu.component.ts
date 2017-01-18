import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Game} from "../../model/game";
import {SnakeService} from "../../service/snake.service";
@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  providers: [SnakeService],
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
 game: Game;
 @Input() isGameRunning: boolean;
 @Output() onLevelChange = new EventEmitter();

 constructor(private snakeService: SnakeService) {
   this.snakeService.getGame().subscribe(game => {
     this.game = game;
   });
 }
}
