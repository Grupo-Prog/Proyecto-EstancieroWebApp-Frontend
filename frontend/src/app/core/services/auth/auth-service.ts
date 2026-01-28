import { Injectable } from '@angular/core';
import {UserResponseDTO} from '../../models/interfaces/user/user-response-dto';

/*
 *  This service manage the authentication status on the frontend
 */

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  getCurrentUser(): UserResponseDTO | null {
    const user = sessionStorage.getItem('user');

    if (user !== null) {
      return JSON.parse(user);
    }

    return null;
  }

  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();

    if (user !== null) {
      return user.id;
    }

    return null;
  }

  isLogged(): boolean {
    return !!this.getCurrentUser();
  }

  setUserSession(user: UserResponseDTO): void {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

}
