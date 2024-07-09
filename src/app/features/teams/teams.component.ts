import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { Team } from '../../models/team.model';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [PaginatedSortableTableComponent, MatCardModule, MatIconModule],
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

  constructor(
    private teamService: TeamService,
    private projectService: ProjectService
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

  getTeamProjectNames(team: Team): string {
    return team.projects?.map(project => project.name).join(', ') || '';
  }
}