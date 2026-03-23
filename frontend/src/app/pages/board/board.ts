import { Component, OnInit, inject } from '@angular/core';
import { GameService } from '../../core/services/game/game-service';
import {LobbyService} from '../../core/services/lobby/lobby-service';
import {GameResponseDTO} from '../../core/models/interfaces/game/game-response-dto';
import {Observable} from 'rxjs';
import {AsyncPipe, NgStyle} from '@angular/common';
import {BOARD_POSITIONS} from './board-constants/board-positions';
import {GAME_PIECES_SVG} from './board-constants/game-pieces';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.html',
  styleUrl: './board.css',
  imports: [AsyncPipe, NgStyle]
})
export class Board implements OnInit {

  private gameService = inject(GameService);
  private lobbyService = inject(LobbyService);

  boxes: any[] = [];

  // Coordenadas del tablero
  boardPositions = BOARD_POSITIONS;

  // Enum d colores conectado con los svg
  gamePiecesSvg = GAME_PIECES_SVG;

  // Observable del game
  game!: Observable<GameResponseDTO>;


  ngOnInit():void {
    const gameId = this.lobbyService.getCurrentGameId();
    //Asigno el observable a la variable
    this.game = this.gameService.getGame(gameId);

    if (!gameId) {
      console.error("No gameId found");
      return;
    }

    this.gameService.getGame(gameId).subscribe({
      next: (game) => {
        console.log("GAME", game);
        this.boxes = game.board.boxes;
      },
      error: (err) => {
        console.error("Error", err);
      }
    });
  }

  onTileClick(position: number) {
    const box = this.boxes.find(b => b.position === position);
    console.log(box);
  }

  // Funcion para obtener la posicion y devolver el estilo
  getPiecePosition(position: number) {
    const pos = this.boardPositions[position];

    if (!pos) return {};

    return {
      left: pos.x + '%',
      top: pos.y + '%'
    };
  }
}
