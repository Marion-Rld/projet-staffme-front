import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../../components/shared/back-button/back-button.component';
import { DetailCardComponent } from '../../components/shared/detail-card/detail-card.component';
import { CollaboratorDialogComponent } from '../../components/collaborators/collaborator-dialog/collaborator-dialog.component';
import { Collaborator } from '../../models/collaborator.model';
import { UserInfosComponent } from '../user-infos/user-infos.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BackButtonComponent,
    DetailCardComponent,
    CollaboratorDialogComponent,
    UserInfosComponent
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService],
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  @Input() userData: Collaborator = {
    _id: '',
    lastName: '',
    firstName: '',
    email: '',
    phoneNumber: '',
    job: '',
    gender: '',
    postalAddress: '',
  };

  collaboratorDialogComponent = CollaboratorDialogComponent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.userId = params['id'];
      this.loadUserData();
    });
  }

  goBack(): void {
    window.history.back();
  }

  loadUserData() {
    this.userService.getUserById(this.userId).subscribe((data) => {
      this.userData = data;
      console.log('Collaborator data:', this.userData);
    });
  }

  refreshCollaborator(): void {
    if(this.userData?._id) {
      this.loadUserData();
    }
  }

  deleteCollaborator(): void {
    if(this.userData?._id) {
      this.userService.deleteUser(this.userData._id).subscribe(() => {
        this.goBack();
      });
    }
  }
}