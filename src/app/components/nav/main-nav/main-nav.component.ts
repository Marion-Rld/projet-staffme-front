import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  hideNav = false;
  showMobileMenu = false;

  toggleNav() {
    this.showMobileMenu = !this.showMobileMenu;
  }

  logout() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
