import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-user',
  imports: [],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
  standalone: true
})
export class CreateUser {

  constructor(private router: Router) {}

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

}
