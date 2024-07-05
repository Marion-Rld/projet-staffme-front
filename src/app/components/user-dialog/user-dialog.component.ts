import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-user-dialog',
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
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
})
export class UserDialogComponent {
  userForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.isEditMode = !!data.user;
    this.userForm = this.fb.group({
      lastName: [data.user?.lastName || '', [Validators.required, Validators.minLength(2)]],
      firstName: [data.user?.firstName || '', [Validators.required, Validators.minLength(2)]],
      email: [data.user?.email || '', [Validators.required, Validators.email]],
      password: ['', this.isEditMode ? [] : [Validators.required]],
      phoneNumber: [data.user?.phoneNumber || ''],
      job: [data.user?.job || ''],
      gender: [data.user?.gender || ''],
      postalAddress: [data.user?.postalAddress || ''],
      role: [data.user?.role || 'user', [Validators.required]],
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
      if (updated[key] !== original[key]) {
        differences[key] = updated[key];
      }
    });
    return differences;
  }

  onSave(): void {
    if (this.userForm.valid) {
      const formValues = this.userForm.value;
      const filteredValues = this.filterEmptyFields(formValues);

      if (this.isEditMode) {
        const differences = this.findDifferences(this.data.user, filteredValues);
        console.log(differences);
        if (Object.keys(differences).length > 0) {
          this.userService.updateUser(this.data.user._id, differences).subscribe({
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
      } else {
        this.userService.createUser(filteredValues).subscribe({
          next: result => {
            this.dialogRef.close(result);
          },
          error: error => {
            console.error('Error creating user:', error);
          }
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}