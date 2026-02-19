import { Component, inject, OnInit } from '@angular/core';
import { BackButtonComponent } from '../../core/components/back-button-component/back-button-component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../core/services/user/user-service';

@Component({
  selector: 'app-update-user',
  imports: [BackButtonComponent, ReactiveFormsModule],
  templateUrl: './update-user.html',
  styleUrl: './update-user.css',
  standalone: true,
})
export class UpdateUser implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  userForm = this.fb.group({
    id: [0],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
  });

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }
  cargarDatosUsuario() {
    //datos de prueba
    const user = {
      id: 123,
      username: 'John Doe',
      email: '5oXtP@example.com',
    };

    // this.userService.findById(user.id).subscribe((user) => {
    //    this.userForm.patchValue(user);
    //  });

    this.userForm.patchValue(user);
  }
  onSubmit() {
    if (this.userForm.valid) {
      const datosParaEnviar = this.userForm.value;
      console.log('Enviando update:', datosParaEnviar);

      // this.userService.update(datosParaEnviar)...
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
