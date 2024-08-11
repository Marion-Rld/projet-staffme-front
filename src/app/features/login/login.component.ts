import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInputModule,
    MatButtonModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  hidePassword = true;
  errorMessage: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService) {
    console.log('LoginComponent constructor');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          window.location.href = '/';
        },
        error: (error) => {
          if (error.status === 401) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else if (error.status === 400 || error.status === 403) {
            this.errorMessage = 'Email ou mot de passe incorrect.';
          } else {
            this.errorMessage =
              'Une erreur est survenue. Veuillez réessayer plus tard.';
          }
        },
      });
    } else {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      console.log('Form is not valid');
    }
  }
}
