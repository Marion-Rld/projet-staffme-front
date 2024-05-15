import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private apiService: ApiService) {
    console.log('ForgotPasswordComponent constructor');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email: string = this.forgotPasswordForm.get('email')!.value!;
      
      this.apiService.forgotPassword(email).subscribe({
        next: (response) => {
          console.log('Password reset email sent successfully', response);
        },
        error: (error) => {
          console.error('Failed to send password reset email', error);
        }
      });
    } else {
      console.log('Form is not valid');
    }
  }

}
