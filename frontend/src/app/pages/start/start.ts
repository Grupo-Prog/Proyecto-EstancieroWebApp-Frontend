import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-start',
  imports: [],
  templateUrl: './start.html',
  styleUrl: './start.css',
  standalone: true
})
export class Start {

  constructor(private router: Router) {}

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

}
