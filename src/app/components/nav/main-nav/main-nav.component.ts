import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent implements OnInit {
  isSuperAdmin!: Observable<boolean>;
  hideNav = false;
  showMobileMenu = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isSuperAdmin = this.authService.isSuperAdmin();
  }

  toggleNav(): void {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
