import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { Team } from '../../models/team.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';
import { TeamDialogComponent } from '../../components/teams/team-dialog/team-dialog.component';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [PaginatedSortableTableComponent, MatCardModule, MatIconModule, SearchInputComponent, AddButtonComponent, TeamDialogComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  teams: MatTableDataSource<Team & { memberCount: number, associatedProjects: string }> = new MatTableDataSource<Team & { memberCount: number, associatedProjects: string }>([]);
  displayedColumns: string[] = ['name', 'memberCount', 'associatedProjects'];
  translatedColumns: { [key: string]: string } = {
    name: 'Nom',
    memberCount: 'Nombre de participants',
    associatedProjects: 'Projets associés'
  };

  dataSource = new MatTableDataSource<Team & { memberCount: number, associatedProjects: string }>([]);

  constructor(
    private teamService: TeamService,
    private projectService: ProjectService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => {
      const transformedTeams = teams.map(team => ({
        ...team,
        memberCount: team.users?.length || 0,
        associatedProjects: this.getTeamProjectNames(team)
      }));
      this.teams.data = transformedTeams;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '400px',
      data: { team: null }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.getTeams().subscribe(teams => {
          const transformedTeams = teams.map(team => ({
            ...team,
            memberCount: team.users?.length || 0,
            associatedProjects: this.getTeamProjectNames(team)
          }));
          this.teams.data = transformedTeams;
        });
      }
    });
  }

  getTeamProjectNames(team: Team): string {
    return team.projects?.map(project => project.name).join(', ') || '';
  }
}