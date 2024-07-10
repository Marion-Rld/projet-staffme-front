import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CollaboratorCardComponent } from '../../components/projects/collaborator-card/collaborator-card.component';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { Team } from '../../models/team.model';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BackButtonComponent } from '../../components/shared/back-button/back-button.component';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [
    CommonModule,
    ProjectCardComponent,
    MatIconModule,
    CollaboratorCardComponent,
    MatDialogModule,
    BackButtonComponent,
  ],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  project: Project = {
    _id: '',
    name: '',
    description: '',
    status: '',
    startDate: new Date(),
    endDate: new Date(),
    budget: 0,
    teams: [],
  };
  teamUsers: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = params.get('id');
      if (projectId) {
        this.loadProject(projectId);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  loadProject(projectId: string): void {
    this.projectService.getProjectById(projectId).subscribe((project) => {
      console.log(project);
      this.project = project;
      this.loadTeamUsers(project.teams[0]);
    });
  }

  loadTeamUsers(team: Team): void {
    const usersIds: string[] = [];

    this.project.teams.forEach((team: Team) => {
      if (team.users) {
        usersIds.push(...team.users.toString().split(','));
      }
    });

    if (usersIds.length > 0) {
      this.userService.getUsersByIds(usersIds).subscribe((users) => {
        this.teamUsers = users;
      });
    }
  }
}
