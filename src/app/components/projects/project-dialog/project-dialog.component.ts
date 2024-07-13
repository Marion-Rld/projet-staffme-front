import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../../services/project.service';
import { TeamService } from '../../../services/team.service';
import { Project } from '../../../models/project.model';
import { Team } from '../../../models/team.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-project-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.scss'],
})
export class ProjectDialogComponent implements OnInit {
  projectForm: FormGroup;
  isEditMode: boolean;
  teams: Team[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project | null }
  ) {
    this.isEditMode = !!data.project;
    this.projectForm = this.fb.group({
      name: [data.project?.name || '', [Validators.required, Validators.minLength(2)]],
      description: [data.project?.description || '', [Validators.required]],
      status: [data.project?.status || '', [Validators.required]],
      startDate: [data.project?.startDate || '', [Validators.required]],
      endDate: [data.project?.endDate || '', [Validators.required]],
      budget: [data.project?.budget || '', [Validators.required, Validators.min(0)]],
      teams: [data.project?.teams?.map(team => team._id) || []]
    });
  }

  ngOnInit() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    if (this.isEditMode && this.data.project) {
      const teamIds = this.data.project.teams.map(team => team._id);
      this.projectForm.patchValue({
        teams: teamIds
      });
    }
  }

  onSave(): void {
    if (this.projectForm.valid) {
      const formValues = this.projectForm.value;
      const projectPayload = {
        ...formValues,
        teams: formValues.teams,
        startDate: this.projectForm.value.startDate.toISOString(),
        endDate: this.projectForm.value.endDate.toISOString()
      };

      console.log('Project payload:', projectPayload);

      if (this.isEditMode && this.data.project && this.data.project._id) {
        this.projectService.updateProject(this.data.project._id, projectPayload).subscribe({
          next: result => {
            this.dialogRef.close(result);
          },
          error: error => {
            console.error('Error updating project:', error);
          }
        });
      } else {
        this.projectService.createProject(projectPayload).subscribe({
          next: result => {
            this.dialogRef.close(result);
          },
          error: error => {
            console.error('Error creating project:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
