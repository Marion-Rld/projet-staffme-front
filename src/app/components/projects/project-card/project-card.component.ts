import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { Project } from '../../../models/project.model';
import { ProjectDialogComponent } from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    EditButtonComponent,
    MatFormFieldModule,
    MatDialogModule,
  ],
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent {
  @Input() project: any;

  dataSource = new MatTableDataSource<Project>([]);

  constructor(public dialog: MatDialog) {}

  goBack(): void {
    window.history.back();
  }

  addUpdatedProjectToTable(project: any): void {
    const index = this.dataSource.data.findIndex((p) => p._id === project._id);
    this.dataSource.data[index] = project;
    this.dataSource._updateChangeSubscription();
  }

  openEditProjectDialog(): void {
    console.log('Opening edit project dialog');
    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      width: '800px',
      panelClass: 'custom-modal',
      data: { project: this.project },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Project updated:', result);
        this.addUpdatedProjectToTable(result);
      }
    });
  }

  getCollaboratorsText(): string {
    const count = this.project.teams.reduce(
      (acc: number, team: any) => acc + team.users.length,
      0
    );
    return `${count} collaborateur${count > 1 ? 's' : ''}`;
  }
}
