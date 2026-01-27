import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {JoinGameDTO} from '../../models/interfaces/game/join-game-dto';
import {GameResponseDTO} from '../../models/interfaces/game/game-response-dto';
import {BotDifficultyType} from '../../models/enums/bot-difficulty-type.enum';
import {HttpClient} from '@angular/common/http';
import {CreateGameDTO} from '../../models/interfaces/game/create-game-dto';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  private apiUrl = 'http://localhost:8080/api/games';
  private http = inject(HttpClient);

  // POST

  createGame(dto: CreateGameDTO): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}`, dto);
  }

  joinGame(gameId: number, dto: JoinGameDTO): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/${gameId}/join`, dto);
  }

  addBot(gameId: number, difficulty: BotDifficultyType): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/${gameId}/addBot`, { difficulty });
  }


  // PUT

  removeBot(gameId: number, botId: number): Observable<GameResponseDTO> {
    return this.http.put<GameResponseDTO>(`${this.apiUrl}/${gameId}/removeBot/${botId}`, {});
  }
}
