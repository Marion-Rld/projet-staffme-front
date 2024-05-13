import { Routes } from '@angular/router';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: '', component: MainNavComponent},
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent}
];
