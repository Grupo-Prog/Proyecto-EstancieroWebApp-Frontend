import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true
})
export class Menu {

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
    this.router.navigate(['/lobby']);
  }



}
