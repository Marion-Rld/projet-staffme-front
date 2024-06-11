import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet, NavigationEnd } from '@angular/router';
import { MainNavComponent } from "./features/main-nav/main-nav.component";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterOutlet, MainNavComponent, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
})
export class AppComponent {
  title = 'projet-staffme-front';

  showMainNav = true;
  hideNavRoutes = ['/login', '/register', '/forgot-password']; // Routes où le MainNav doit être caché

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMainNav = !this.hideNavRoutes.includes(event.urlAfterRedirects);
    });

  }
}
