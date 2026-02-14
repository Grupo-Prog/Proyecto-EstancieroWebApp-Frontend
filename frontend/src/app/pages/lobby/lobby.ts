import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../../core/services/game/game-service';
import { LobbyService } from '../../core/services/lobby/lobby-service';
import {FormsModule} from '@angular/forms';
import {BotDifficultyType} from '../../core/models/enums/bot-difficulty-type.enum';
import {CommonModule} from '@angular/common';
import {firstValueFrom} from 'rxjs';

interface PlayerSlot {
  type: 'HUMAN' | 'BOT' | 'CLOSED';
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

@Component({
  selector: 'app-lobby',
  standalone: true,
  templateUrl: './lobby.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./lobby.css']
})
export class Lobby {

  private gameService = inject(GameService);
  private lobbyService = inject(LobbyService);
  private router = inject(Router);

  playerSlots: PlayerSlot[] = [
    { type: 'HUMAN' },
    { type: 'CLOSED' },
    { type: 'CLOSED' },
    { type: 'CLOSED' },
    { type: 'CLOSED' },
    { type: 'CLOSED' }
  ];

  async startGame() {
    const gameId = this.lobbyService.getCurrentGameId();
    if (!gameId) {
      console.error('No gameId found');
      return;
    }

    try {
      for (const slot of this.playerSlots.filter(s => s.type === 'BOT')) {
        if (!slot.difficulty) continue;
        const difficultyEnum: BotDifficultyType = BotDifficultyType[slot.difficulty];
        await firstValueFrom(this.lobbyService.addBot(gameId, difficultyEnum));
      }

      const game = await firstValueFrom(this.gameService.startGame(gameId));
      console.log('Match started', game);
      this.router.navigate(['/board']);

    } catch (err) {
      console.error('Error starting game or adding bots\n', err);
    }
  }


  goToMenuPage() {
    this.router.navigate(['menu']);
  }
}
