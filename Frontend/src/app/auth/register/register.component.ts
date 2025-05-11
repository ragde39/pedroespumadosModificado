import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    HeaderComponent,
    FooterComponent,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    // Inicialización del formulario dentro del constructor
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      secondName: ['', [Validators.required, Validators.maxLength(20)]],
      firstLastName: ['', [Validators.required, Validators.maxLength(20)]],
      secondLastName: ['', [Validators.required, Validators.maxLength(20)]],
      username: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.authService
        .register({
          firstName: this.registerForm.value.firstName || '',
          secondName: this.registerForm.value.secondName || '',
          firstLastName: this.registerForm.value.firstLastName || '',
          secondLastName: this.registerForm.value.secondLastName || '',
          username: this.registerForm.value.username || '',
          email: this.registerForm.value.email || '',
          password: this.registerForm.value.password || '',
        })
        .subscribe({
          next: (response) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/dashboard']);
          },
          error: (err) => {
            this.errorMessage = 'Error en el registro';
            console.error(err);
          },
        });
    }
  }
}
