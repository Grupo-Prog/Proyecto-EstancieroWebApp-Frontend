import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../core/services/game/game-service';

@Component({
  selector: 'app-board',
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board implements OnInit {

  private gameService = inject(GameService);

  boxes: any[] = [];

  ngOnInit() {
    const game = this.gameService.currentGame;

    if (game) {
      this.boxes = game.board.boxes;
    } else {
      console.error("No hay game cargado");
    }
  }

  onTileClick(position: number) {
    const box = this.boxes.find(b => b.position === position);
    console.log(box);
  }
}
