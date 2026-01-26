import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-lobby',
  imports: [],
  templateUrl: './lobby.html',
  styleUrl: './lobby.css',
  standalone: true
})
export class Lobby {

  constructor(private router: Router) {}


  goToMenuPage(){
    this.router.navigate(['menu']);
  }

  goToBoardPage(){
    this.router.navigate(['board']);
  }

}
