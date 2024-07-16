import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../../../services/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Collaborator } from '../../../models/collaborator.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-collaborator-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './collaborator-dialog.component.html',
  styleUrls: ['./collaborator-dialog.component.scss']
})
export class CollaboratorDialogComponent implements OnInit {
  collaboratorForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CollaboratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { entity: Collaborator }
  ) {
    this.isEditMode = !!data.entity;
    this.collaboratorForm = this.fb.group({
      lastName: [data.entity?.lastName || '', [Validators.required, Validators.minLength(2)]],
      firstName: [data.entity?.firstName || '', [Validators.required, Validators.minLength(2)]],
      email: [data.entity?.email || '', [Validators.required, Validators.email]],
      phoneNumber: [data.entity?.phoneNumber || ''],
      job: [data.entity?.job || ''],
      gender: [data.entity?.gender || ''],
      postalAddress: [data.entity?.postalAddress || ''],
    });
  }

  ngOnInit(): void {
    if (this.isEditMode && this.data.entity) {
      this.loadUserData(this.data.entity._id);
    }
  }

  loadUserData(userId: string): void {
    this.userService.getUserById(userId).subscribe((entity) => {
      this.collaboratorForm.patchValue(entity);
    });
  }

  filterEmptyFields(data: any): any {
    const filteredData: any = {};
    Object.keys(data).forEach(key => {
      if (key !== '_id' && key !== '__v' && data[key] !== null && data[key] !== undefined && data[key] !== '') {
        if (Array.isArray(data[key])) {
          const filteredArray = data[key].filter((item: string | null | undefined) => item !== null && item !== undefined && item !== '');
          if (filteredArray.length > 0) {
            filteredData[key] = filteredArray;
          }
        } else {
          filteredData[key] = data[key];
        }
      }
    });
    return filteredData;
  }

  findDifferences(original: any, updated: any): any {
    const differences: any = {};
    Object.keys(updated).forEach(key => {
      if (original && updated[key] !== original[key]) {
        differences[key] = updated[key];
      }
    });
    return differences;
  }

  onSave(): void {
    if (this.collaboratorForm.valid) {
      const formValues = this.collaboratorForm.value;
      const filteredValues = this.filterEmptyFields(formValues);
      const differences = this.findDifferences(this.data.entity, filteredValues);

      if (Object.keys(differences).length > 0 && this.data.entity) {
        this.userService.updateUser(this.data.entity._id, differences).subscribe({
          next: result => {
            this.dialogRef.close(result);
          },
          error: error => {
            console.error('Error updating user:', error);
          }
        });
      } else {
        this.dialogRef.close();
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}