import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../../components/shared/back-button/back-button.component';
import { DetailCardComponent } from '../../components/shared/detail-card/detail-card.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BackButtonComponent,
    DetailCardComponent,
  ],
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService],
})
export class UserProfileComponent implements OnInit {
  userId: string = '';
  userData: any;

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
      console.log('User data:', this.userData);
    });
  }
}
