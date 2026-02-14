import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth/auth-service';
import {LobbyService } from '../../core/services/lobby/lobby-service';
import {CreateGameDTO} from '../../core/models/interfaces/game/create-game-dto';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true
})
export class Menu {

  private lobbyService = inject(LobbyService);
  private authService= inject(AuthService);

  constructor(private router: Router) {}

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  goToConfigurationPage() {
    this.router.navigate(['/configuration']);
  }

  goToLoadPage() {
    this.router.navigate(['/load']);
  }

  goToLobbyPage() {
    const userId = this.authService.getCurrentUserId();

    if (!userId) {
      // Lo saco pq te redirige y es re pesado
      // this.router.navigate(['login'])
      alert("Logeate porfa")
      return;
    }

    const dto: CreateGameDTO = {
      hostUserId: userId
    };

    this.lobbyService.createGame(dto).subscribe({
      next: (game) => {
        this.lobbyService.setCurrentGameId(game.id);
        console.log('Game created', game);
        this.router.navigate(['/lobby']);},

      error: (err) => console.error('Error creating game', err),
    });

  }


  getUserName(): string | null {
    const user = this.authService.getCurrentUser();

    if (user === null) {
      return null;
    }

    return user.name;
  }

  isLoggedIn(): boolean {
    return this.authService.isLogged();
  }
}
