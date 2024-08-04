import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MatButtonModule, MatInputModule, CommonModule, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      const email: string = this.forgotPasswordForm.get('email')!.value!;

      this.authService.forgotPassword(email).subscribe({
        next: (response) => {
          this.notificationService.showSuccess(
            'Un email de réinitialisation a été envoyé'
          );
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.notificationService.showError(
            "Erreur lors de l'envoi de l'email de réinitialisation."
          );
          console.error('Failed to send password reset email', error);
        },
      });
    } else {
      console.log('Form is not valid');
    }
  }
}
