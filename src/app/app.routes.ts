import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { HomePageComponent } from './features/home-page/home-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent}
];
