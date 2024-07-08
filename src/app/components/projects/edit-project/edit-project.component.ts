import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import {
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
  MatNativeDateModule,
  NativeDateAdapter,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../services/team.service';
import { Team } from '../../../models/team.model';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-project',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.scss'],
})
export class EditProjectComponent implements OnInit {
  projectForm = new FormGroup({
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    budget: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    teams: new FormControl<Team[]>([]),
  });

  teams: Team[] = [];

  constructor(
    private projectService: ProjectService,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<EditProjectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { project: Project }
  ) {}

  ngOnInit(): void {
    console.log(
      'EditProjectComponent initialized with project:',
      this.data.project
    );
    this.teamService.getTeams().subscribe((teams) => {
      this.teams = teams;
    });

    if (this.data.project) {
      this.projectForm.patchValue({
        name: this.data.project.name,
        startDate: this.formatDate(this.data.project.startDate),
        endDate: this.formatDate(this.data.project.endDate),
        description: this.data.project.description,
        budget: this.data.project.budget.toString(),
        teams: this.data.project.teams,
      });
    }
  }
  private formatDate(date: Date): string {
    const d = new Date(date);
    const day = ('0' + d.getDate()).slice(-2);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }

  onSubmit(): void {
    if (this.projectForm.valid) {
      const formValue = this.projectForm.value;

      const updatedProject: Project = {
        ...this.data.project,
        name: formValue.name!,
        startDate: new Date(formValue.startDate!),
        endDate: new Date(formValue.endDate!),
        description: formValue.description!,
        budget: Number(formValue.budget!),
        teams: formValue.teams!,
        status: this.data.project.status,
      };

      this.projectService
        .updateProject(updatedProject)
        .subscribe((response) => {
          this.dialogRef.close(response);
        });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
