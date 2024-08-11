import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  token!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
    this.resetForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.checkPasswords }
    );
  }

  ngOnInit() {
    this.token = this.route.snapshot.params['token'];
  }

  checkPasswords(group: FormGroup) {
    const pass = group.get('password')?.value;
    const confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const newPassword = this.resetForm.get('password')?.value || '';
      this.authService.resetPassword(this.token, newPassword).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          this.notificationService.showSuccess(
            "Mot de passe a été réinitialisé avec succès. Veuillez vous connecter."
          );
        },
        error: (error) => {
          console.error(
            'Erreur lors de la réinitialisation du mot de passe',
            error
          );
          this.notificationService.showError(
            'Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.'
          );
        },
      });
    }
  }
}
