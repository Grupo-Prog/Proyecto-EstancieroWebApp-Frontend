import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserResponseDTO} from '../../models/interfaces/user/user-response-dto';
import {UserCreateRequestDTO} from '../../models/interfaces/user/user-create-request-dto';
import {UserUpdateRequestDTO} from '../../models/interfaces/user/user-update-request-dto';
import {UserLoginRequestDTO} from '../../models/interfaces/user/user-login-request-dto';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private readonly apiUrl = 'http://localhost:8080/api/users';
  private http = inject(HttpClient);

  // GET

  findAll(): Observable<UserResponseDTO[]> {
    return this.http.get<UserResponseDTO[]>(this.apiUrl);
  }

  findById(id: number): Observable<UserResponseDTO> {
    return this.http.get<UserResponseDTO>(`${this.apiUrl}/${id}`);
  }
  
  // POST

  create(dto: UserCreateRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(this.apiUrl, dto);
  }

  loginn(dto: UserLoginRequestDTO): Observable<UserResponseDTO> {
    return this.http.post<UserResponseDTO>(`${this.apiUrl}/login`, dto);
  }

}
