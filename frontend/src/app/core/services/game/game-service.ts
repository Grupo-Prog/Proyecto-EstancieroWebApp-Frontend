import { Injectable } from '@angular/core';
import { GameResponseDTO } from '../../models/interfaces/game/game-response-dto';
import { CreateGameDTO} from '../../models/interfaces/game/create-game-dto';
import {GameRequestDTO} from '../../models/interfaces/game/game-request-dto';
import {JoinGameDTO } from '../../models/interfaces/game/join-game-dto';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private apiUrl = 'http://localhost:8080/api/games';
  constructor(private http: HttpClient) {}

  createGame(dto: CreateGameDTO): Observable<GameResponseDTO> {
    return this.http.post<GameResponseDTO>(`${this.apiUrl}/createGame`, dto);
  }


}
