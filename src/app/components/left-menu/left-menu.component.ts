import {Component, Input, Output, EventEmitter} from "@angular/core";
import {Game} from "../../model/game";
@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  styleUrls: ['./left-menu.component.css']
})
export class LeftMenuComponent {
 @Input() game: Game;
 @Input() isGameRunning: boolean;
 @Output() onLevelChange = new EventEmitter();
}
