import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
/*import { ProjectsComponent } from './features/projects/projects.component';
import { TeamsComponent } from './features/teams/teams.component';
import { CollaboratorsComponent } from './features/collaborators/collaborators.component';
import { LogoutComponent } from './features/logout/logout.component';*/

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: 'dashboard', component: DashboardComponent },
    /*{ path: 'projects', component: ProjectsComponent },
    { path: 'teams', component: TeamsComponent },
    { path: 'collaborators', component: CollaboratorsComponent },
    { path: 'logout', component: LogoutComponent }*/
];
