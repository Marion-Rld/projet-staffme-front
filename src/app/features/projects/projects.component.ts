import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { MatDialog } from '@angular/material/dialog';
import { ProjectDialogComponent } from '../../components/projects/project-dialog/project-dialog.component'; // Update to ProjectDialogComponent
import { Team } from '../../models/team.model';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PaginatedSortableTableComponent,
    MatFormFieldModule,
    MatInputModule,
    SearchInputComponent,
    AddButtonComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'description',
    'startDate',
    'endDate',
    'status',
    'budget',
    'teams',
  ];

  translatedColumns: { [key: string]: string } = {
    name: 'Nom',
    description: 'Description',
    startDate: 'Date de début',
    endDate: 'Date de fin',
    status: 'Statut',
    budget: 'Budget',
    teams: 'Équipes',
  };

  dataSource = new MatTableDataSource<Project>([]);
  teams: Team[] = [];

  constructor(
    private teamService: TeamService,
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    this.loadTeams();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.dataSource.data = projects;
    });
  }

  loadTeams(): void {
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDisplayedColumn(column: string): string {
    return this.translatedColumns[column] || column;
  }

  addProjectToTable(project: Project): void {
    const updatedTeams: Team[] = project.teams.map((teamId: string | Team) => {
      const team = this.teams.find((team) => team._id === teamId);
      return team ? team : ({ _id: teamId, name: 'Unknown' } as Team);
    });
    project.teams = updatedTeams as Team[];
    this.dataSource.data = [...this.dataSource.data, project];
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(ProjectDialogComponent, { // Update to ProjectDialogComponent
      width: '800px',
      panelClass: 'custom-modal',
      data: { project: null } // Ensures the dialog knows it's a creation
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Project created:', result);
        this.addProjectToTable(result);
      }
    });
  }
}