import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { UserListComponent } from './features/user-list/user-list.component';
import { AuthGuard } from '../../src/app/guard/auth.guard';
import { SuperAdminGuard } from './guard/superadmin.guard';
import { ProjectsComponent } from './features/projects/projects.component';
import { ProjectDetailComponent } from './features/project-detail/project-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component'; // Assurez-vous d'importer votre composant PageNotFound
import { TeamsComponent } from './features/teams/teams.component';
import { TeamDetailComponent } from './features/team-detail/team-detail.component';
import { UserProfileComponent } from './features/user-profile/user-profile.component';
import { CollaboratorsComponent } from './features/collaborators/collaborators.component';
import { ResetPasswordComponent } from './features/reset-password/reset-password.component';
/*
import { TeamsComponent } from './features/teams/teams.component';

import { LogoutComponent } from './features/logout/logout.component';*/

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  {
    path: 'projects/:id',
    component: ProjectDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [SuperAdminGuard],
  },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  {
    path: 'teams/:id',
    component: TeamDetailComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [SuperAdminGuard],
  },
  {
    path: 'collaborators',
    component: CollaboratorsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent }, // Page non-trouvée
  /*
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] }*/
];
