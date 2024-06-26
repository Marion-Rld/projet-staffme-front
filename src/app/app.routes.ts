import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AuthGuard } from '../../src/app/guard/auth.guard';
import { AdminGuard } from '../../src/app/guard/admin.guard';
import { SuperAdminGuard } from './guard/superadmin.guard';
/*import { ProjectsComponent } from './features/projects/projects.component';
import { TeamsComponent } from './features/teams/teams.component';
import { CollaboratorsComponent } from './features/collaborators/collaborators.component';
import { LogoutComponent } from './features/logout/logout.component';*/

export const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'forgot-password', component: ForgotPasswordComponent},
    { path: '', component: DashboardComponent, canActivate: [SuperAdminGuard] },
    /*{ path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
    { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
    { path: 'collaborators', component: CollaboratorsComponent, canActivate: [AuthGuard] },
    { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }*/
];
