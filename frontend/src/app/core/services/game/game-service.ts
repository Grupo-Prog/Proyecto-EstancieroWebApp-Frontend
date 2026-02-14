import {inject, Injectable} from '@angular/core';
import { GameResponseDTO } from '../../models/interfaces/game/game-response-dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/games';
  private http = inject(HttpClient);

  // GET

  getAllGames(): Observable<GameResponseDTO[]> {
    return this.http.get<GameResponseDTO[]>(this.apiUrl);
  }

  getGame(gameId: number): Observable<GameResponseDTO> {
    return this.http.get<GameResponseDTO>(`${this.apiUrl}/${gameId}`);
  }

  //POST

  startGame(gameId: number): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/${gameId}/start`, {});
  }

  addColor(gameId: number, playerId: number, color: string): Observable<GameResponseDTO> {
    const body = {
      playerId: playerId,
      color: color
    };

    return this.http.post<GameResponseDTO>(`${this.apiUrl}/${gameId}/addColor`, body);
  }







}
