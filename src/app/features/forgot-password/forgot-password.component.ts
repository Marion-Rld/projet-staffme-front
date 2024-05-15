import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor() {
    console.log('ForgotPasswordComponent constructor');
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid) {
      console.log('Form Data:', this.forgotPasswordForm.value);
    } else {
      console.log('Form is not valid');
    }
  }

}
