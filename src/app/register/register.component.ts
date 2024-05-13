import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor() { }

  onSubmit() {
    console.log('Form submitted');
    console.log('First Name: ' + this.firstname);
    console.log('Last Name: ' + this.lastname);
    console.log('Email: ' + this.email);
    console.log('Password: ' + this.password)
  }

}
