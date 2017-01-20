import {
  Component, Input, Output, EventEmitter, OnInit, trigger, state, style, transition,
  animate
} from "@angular/core";
import {Game} from "../../model/game";
import {SnakeService} from "../../service/snake.service";
@Component({
  selector: 'left-menu',
  templateUrl: './left-menu.component.html',
  providers: [],
  styleUrls: ['./left-menu.component.css'],
  animations: [
    trigger('scoreChanged', [
      state('inactive', style({
        color: 'black',
        display: 'none',
        transform: 'scale(1)'
      })),
      state('active',   style({
        color: '#981b1b',
        transform: 'scale(1.5)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]

})
export class LeftMenuComponent implements OnInit {
 game: Game;
 level: number;
 scoreEvolution: string;
 isScoreChanged: string;
 constructor(private snakeService: SnakeService) {
 }

  ngOnInit(): void {
    this.isScoreChanged = 'inactive';
    this.snakeService.getGame().subscribe(game => {
      this.game = game;
      this.level = game.level;
    });
    this.snakeService.getScoreEvolution().subscribe(scoreEvolution => {
      if (scoreEvolution && scoreEvolution !== 0) {
        this.scoreEvolution = '+' + scoreEvolution;
        this.isScoreChanged = 'active';
        setTimeout(() => {
          this.isScoreChanged = 'inactive';
        }, 1500);
      }
    });
  }

  onLevelChange () {
   this.snakeService.onLevelChange(this.level);
  }
}
