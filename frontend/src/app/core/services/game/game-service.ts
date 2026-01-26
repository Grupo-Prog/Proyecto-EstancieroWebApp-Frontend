import {inject, Injectable} from '@angular/core';
import { GameResponseDTO } from '../../models/interfaces/game/game-response-dto';
import { CreateGameDTO} from '../../models/interfaces/game/create-game-dto';
import {GameRequestDTO} from '../../models/interfaces/game/game-request-dto';
import {JoinGameDTO } from '../../models/interfaces/game/join-game-dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {BotDifficultyType} from '../../models/enums/bot-difficulty-type.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/games';
  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient);

  // GET

  getAllGames(): Observable<GameResponseDTO[]> {
    return this.http.get<GameResponseDTO[]>(this.apiUrl);
  }

  getGame(gameId: number): Observable<GameResponseDTO> {
    return this.http.get<GameResponseDTO>(`${this.apiUrl}/${gameId}`);
  }


  //POST

  createGame(dto: CreateGameDTO): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/createGame`, dto);
  }

  startGame(gameId: number): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/${gameId}/start`, {});
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
