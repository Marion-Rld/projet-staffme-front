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
import { CreateProjectComponent } from '../../components/projects/create-project/create-project.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PaginatedSortableTableComponent,
    MatFormFieldModule,
    MatInputModule,
    SearchInputComponent,
    AddButtonComponent,
    CreateProjectComponent,
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

  constructor(
    private projectService: ProjectService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      console;
      this.dataSource.data = projects;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDisplayedColumn(column: string): string {
    return this.translatedColumns[column] || column;
  }

  openCreateProjectDialog(): void {
    const dialogRef = this.dialog.open(CreateProjectComponent, {
      width: '800px',
      panelClass: 'custom-modal',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Project created:', result);
        // Ajouter le nouveau projet à la table, par exemple :
        // this.dataSource.data = [...this.dataSource.data, result];
      }
    });
  }
}
