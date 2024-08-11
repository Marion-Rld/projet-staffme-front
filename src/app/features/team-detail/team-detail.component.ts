import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { CollaboratorCardComponent } from '../../components/projects/collaborator-card/collaborator-card.component';
import { BackButtonComponent } from '../../components/shared/back-button/back-button.component';
import { DetailCardComponent } from '../../components/shared/detail-card/detail-card.component';
import { TeamDialogComponent } from '../../components/teams/team-dialog/team-dialog.component';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    CollaboratorCardComponent,
    BackButtonComponent,
    DetailCardComponent,
    TeamDialogComponent,
  ],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  @Input() team: Team = {
    _id: '',
    name: '',
    users: [],
    projects: [],
  };
  teamUsers: User[] = [];
  teamDialogComponent = TeamDialogComponent;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const teamId = params.get('id');
      if (teamId) {
        this.loadTeam(teamId);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  loadTeam(teamId: string): void {
    this.teamService.getTeamById(teamId).subscribe((team) => {
      this.team = team;
      this.loadTeamUsers(team);
    });
  }

  loadTeamUsers(team: Team): void {
    if (team.users) {
      const userIds = team.users.map((user) => user._id);
      this.userService.getUsersByIds(userIds).subscribe((users) => {
        this.teamUsers = users;
      });
    }
  }

  getCollaboratorsText(): string {
    const count = this.team.users.length;
    return `${count} collaborateur${count > 1 ? 's' : ''}`;
  }

  refreshTeam(): void {
    if (this.team._id) {
      this.loadTeam(this.team._id);
    }
  }

  deleteTeam(): void {
    if (this.team._id) {
      this.teamService.deleteTeam(this.team._id).subscribe(() => {
        this.goBack();
      });
    }
  }
}
