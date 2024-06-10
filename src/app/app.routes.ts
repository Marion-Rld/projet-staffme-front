import { Routes } from '@angular/router';
import { MainNavComponent } from './features/main-nav/main-nav.component';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', component: MainNavComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent}
];
