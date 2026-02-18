import {Component, inject} from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../core/services/user/user-service';
import { AuthService } from '../../core/services/auth/auth-service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  private router = inject(Router);
  private userService = inject(UserService);
  private authService = inject(AuthService);

  email = '';
  password = '';

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


  login(): void {
    const dto = {
      email: this.email,
      password: this.password
    };

    this.userService.login(dto).subscribe({
      next: (user) => {
        this.authService.setUserSession(user);
        console.log("User logged", user);
        this.router.navigate(['menu']);
      },
      error: () => alert('Credentials error!')
    });
  }

}
