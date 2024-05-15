import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d\s])[A-Za-z\d\s!@#$%^&*()_+[\]{};':"\\|,.<>?`~\-+=]{8,}$/
      ),
    ]), // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private apiService: ApiService) {
    console.log('RegisterComponent constructor');
  }

  onSubmit() {
    if (this.registerForm.valid && this.passwordsMatch()) {
      this.apiService.addUser(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('User added successfully', response);
        },
        error: (error) => {
          console.error('Failed to add user', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

  passwordsMatch(): boolean {
    const pass = this.registerForm.get('password')?.value;
    const confirmPass = this.registerForm.get('confirmPassword')?.value;
    if (pass !== confirmPass) {
      this.registerForm.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      this.registerForm.get('confirmPassword')?.setErrors(null);
    }
    return pass === confirmPass;
  }
}
