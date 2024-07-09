import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Team } from '../../models/team.model';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatTableModule, CommonModule, PaginatedSortableTableComponent, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  projects: MatTableDataSource<Project & { teamNames: string }> = new MatTableDataSource<Project & { teamNames: string }>([]);
  teamsDataSource: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);
  displayedProjectColumns: string[] = ['name', 'startDate', 'endDate', 'teamNames'];
  displayedTeamColumns: string[] = ['name'];
  translatedProjectColumns: { [key: string]: string } = {
    name: 'Nom',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    teamNames: 'Équipes'
  };
  translatedTeamColumns: { [key: string]: string } = {
    name: 'Nom'
  };

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit() {
    this.projectService.getProjects().subscribe(projects => {
      const filteredProjects = projects.filter(project => project.status === 'in progress');
      const transformedProjects = filteredProjects.map(project => ({
        ...project,
        teamNames: this.getProjectTeamNames(project)
      }));
      this.projects.data = transformedProjects;
    });

    this.teamService.getTeams().subscribe(teams => {
      this.teamsDataSource.data = teams;
    });
  }

  getProjectTeamNames(project: Project): string {
    return project.teams.map(team => team.name).join(', ');
  }

  handleProjectRowAction(event: { type: string; element: Project }) {
    if (event.type === 'click' && event.element) {
      this.router.navigate(['/projects', event.element._id]);
    } else {
      console.log('Unknown action type:', event.type);
    }
  }

  handleTeamRowAction(event: { type: string; element: Team }) {
    if (event.type === 'click' && event.element) {
      this.router.navigate(['/teams', event.element._id]);
    } else {
      console.log('Unknown action type:', event.type);
    }
  }
}