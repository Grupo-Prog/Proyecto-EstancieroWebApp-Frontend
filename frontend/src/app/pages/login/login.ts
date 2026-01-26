import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {

  constructor(private router: Router) {}

  goToStartPage() {
    this.router.navigate(['']);
  }

  goToCreateUserPage() {
    this.router.navigate(['create-user']);
  }

  goToUpdateUserPage() {
    this.router.navigate(['update-user']);
  }

  goToMenuPage(){
    this.router.navigate(['menu']);
  }

}
