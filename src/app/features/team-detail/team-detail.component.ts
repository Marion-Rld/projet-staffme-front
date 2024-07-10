import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { UserService } from '../../services/user.service';
import { TeamDialogComponent } from '../../components/teams/team-dialog/team-dialog.component';
import { User } from '../../models/user.model';
import { Team } from '../../models/team.model';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DeleteButtonComponent } from '../../components/shared/delete-button/delete-button.component';
import { EditButtonComponent } from '../../components/shared/edit-button/edit-button.component';

@Component({
  selector: 'app-team-detail',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DeleteButtonComponent, EditButtonComponent],
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent implements OnInit {
  team: Team | null = null;
  teamUsers: User[] = [];

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private userService: UserService,
    private dialog: MatDialog
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
      const userIds = team.users.map(user => user._id);
      this.userService.getUsersByIds(userIds).subscribe((users) => {
        this.teamUsers = users;
      });
    }
  }

  deleteTeam(): void {
    if (this.team) {
      this.teamService.deleteTeam(this.team._id).subscribe(() => {
        this.goBack();
      });
    }
  }  

  openEditTeamDialog(): void {
    if (this.team) {
      const dialogRef = this.dialog.open(TeamDialogComponent, {
        width: '400px',
        data: { team: this.team }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.loadTeam(this.team!._id);
        }
      });
    }
  }
}
