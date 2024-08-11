import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { UserDialogComponent } from '../../components/users/user-dialog/user-dialog.component';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DeleteConfirmationDialogComponent } from '../../components/shared/delete-button/delete-button.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    PaginatedSortableTableComponent,
    SearchInputComponent,
    AddButtonComponent,
    UserDialogComponent,
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'email',
    'phoneNumber',
    'job',
    'gender',
    'postalAddress',
    'role',
    'actions'
  ];

  translatedColumns: { [key: string]: string } = {
    lastName: 'Nom',
    firstName: 'Prénom',
    email: 'Email',
    phoneNumber: 'Téléphone',
    job: 'Poste',
    gender: 'Genre',
    postalAddress: 'Adresse',
    role: 'Rôle',
    actions: 'Actions'
  };

  dataSource = new MatTableDataSource<User>([]);

  constructor(
    private userService: UserService,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((users) => {
      this.dataSource.data = users;
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      panelClass: 'custom-modal',
      data: { user: null }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '800px',
      panelClass: 'custom-modal',
      data: { user }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(userId: string): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '300px',
      data: { message: 'Etes-vous sûr de vouloir supprimer cet utilisateur ?' }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe(() => {
          this.loadUsers();
        });
      }
    });
  }

  handleRowAction(action: { type: string; element: User }): void {
    if (action.type === 'edit') {
      this.openEditUserDialog(action.element);
    } else if (action.type === 'delete') {
      this.deleteUser(action.element._id);
    }
  }
}