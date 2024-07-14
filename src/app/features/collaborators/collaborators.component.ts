import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    SearchInputComponent,
    AddButtonComponent,
    MatInputModule,
    MatFormFieldModule,
    PaginatedSortableTableComponent,
  ],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss',
})
export class CollaboratorsComponent implements OnInit {
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'email',
    'postalAddress',
    'job',
  ];

  translatedColumns: { [key: string]: string } = {
    lastName: 'Nom',
    firstName: 'Prénom',
    email: 'Email',
    postalAddress: 'Adresse',
    job: 'Poste',
  };

  dataSource = new MatTableDataSource<User>([]);
  collaborators: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.userService.getUsers().subscribe((collaborators) => {
      this.dataSource.data = collaborators;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDisplayedColumn(column: string): string {
    return this.translatedColumns[column] || column;
  }

  addCollaboratorToTable(collaborator: User): void {
    this.dataSource.data = [...this.dataSource.data, collaborator];
  }
}
