import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamService } from '../../../services/team.service';
import { ProjectService } from '../../../services/project.service';
import { UserService } from '../../../services/user.service';
import { Team } from '../../../models/team.model';
import { Project } from '../../../models/project.model';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-team-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
  ],
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss'],
})
export class TeamDialogComponent implements OnInit {
  teamForm: FormGroup;
  isEditMode: boolean;
  projects: Project[] = [];
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private projectService: ProjectService,
    private userService: UserService,
    public dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entity: Team }
  ) {
    this.isEditMode = !!data.entity;
    this.teamForm = this.fb.group({
      name: [
        data.entity?.name || '',
        [Validators.required, Validators.minLength(2)],
      ],
      users: [data.entity?.users?.map((user) => user._id) || []],
      projects: [data.entity?.projects?.map((project) => project._id) || []],
    });
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });

    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });

    if (this.isEditMode && this.data.entity) {
      const userIds = this.data.entity.users.map((user) => user._id);
      const projectIds = this.data.entity.projects.map(
        (project) => project._id
      );

      this.teamForm.patchValue({
        users: userIds,
        projects: projectIds,
      });
    }
  }

  onSave(): void {
    if (this.teamForm.valid) {
      const formValues = this.teamForm.value;
      const teamPayload = {
        ...formValues,
        users: formValues.users,
        projects: formValues.projects,
      };

      console.log('Team payload:', teamPayload);

      if (this.isEditMode && this.data.entity._id) {
        this.teamService
          .updateTeam(this.data.entity._id, teamPayload)
          .subscribe({
            next: (result) => {
              this.dialogRef.close(result);
            },
            error: (error) => {
              console.error('Error updating team:', error);
            },
          });
      } else {
        this.teamService.createTeam(teamPayload).subscribe({
          next: (result) => {
            this.dialogRef.close(result);
          },
          error: (error) => {
            console.error('Error creating team:', error);
          },
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
