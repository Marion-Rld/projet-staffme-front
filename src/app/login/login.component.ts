import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string  = '';

  constructor() {
    console.log('LoginComponent constructor');
  }

  onSubmit() {
    console.log('LoginComponent onSubmit', this.email, this.password);
  }
}
