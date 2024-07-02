// src/app/user-dialog/user-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    CommonModule,
    MatCardModule,
    MatGridListModule
  ],
})
export class UserDialogComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
      phoneNumber: [''],
      job: [''],
      gender: [''],
      postalAddress: ['']
    });
  }

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.userForm.patchValue(this.data.user);
      this.userForm.get('password')?.setValue(''); // Clear password for edit
    }
  }

  onSave(): void {
    if (this.userForm.valid) {
      const userData = this.userForm.value;

      if (!userData.password) {
        delete userData.password;
      }

      console.log('User data:', userData);

      if (this.data.isEdit) {
        this.userService.updateUser(this.data.user._id, userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      } else {
        this.userService.createUser(userData).subscribe(() => {
          this.dialogRef.close(true);
        });
      }
    }
  }

  onDelete(): void {
    this.userService.deleteUser(this.data.user._id).subscribe(() => {
      this.dialogRef.close(true);
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
