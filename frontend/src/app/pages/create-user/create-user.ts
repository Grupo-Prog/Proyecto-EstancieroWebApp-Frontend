import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {UserService} from '../../core/services/user/user-service';

@Component({
  selector: 'app-create-user',
  imports: [
    FormsModule
  ],
  templateUrl: './create-user.html',
  styleUrl: './create-user.css',
  standalone: true
})
export class CreateUser {

  constructor(private router: Router,
              private userService: UserService,) {}

  email = '';
  password = '';
  name ='';

  goToLoginPage() {
    this.router.navigate(['/login']);
  }

  create(): void {
    const dto = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    this.userService.create(dto).subscribe({
      next: (user) => {
        console.log("Useer created", user);
        this.router.navigate(['login']);
      },
      error: () => alert('Creation error!')
    });
  }

}
