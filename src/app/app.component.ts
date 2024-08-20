import {
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  AfterViewChecked,
  OnInit,
} from '@angular/core';
import {
  Router,
  RouterModule,
  RouterOutlet,
  NavigationEnd,
  NavigationStart,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { MainNavComponent } from './components/nav/main-nav/main-nav.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from '../app/components/nav/top-bar/top-bar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { LoadingSpinnerComponent } from './components/shared/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    RouterOutlet,
    MainNavComponent,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    CommonModule,
    TopBarComponent,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatNativeDateModule,
    LoadingSpinnerComponent
  ],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'projet-staffme-front';
  showMainNav = true;
  isLoading = false;

  hideNavRoutes = [
    '/login',
    '/register',
    '/forgot-password',
    '/reset-password',
  ];

  constructor(private router: Router, private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError
        )
      )
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.isLoading = true;
        } else if (
          event instanceof NavigationEnd ||
          event instanceof NavigationCancel ||
          event instanceof NavigationError
        ) {
          this.isLoading = false;
        }

        if (event instanceof NavigationEnd) {
          const url = event.urlAfterRedirects;
          this.showMainNav = !this.shouldHideNav(url);
          this.adjustContentMargin();
        }
      });

    this.adjustContentMargin();
  }

  ngAfterViewChecked() {
    this.adjustContentMargin();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.adjustContentMargin();
  }

  adjustContentMargin() {
    const sidebar = this.elRef.nativeElement.querySelector('.sidenav');
    const content = this.elRef.nativeElement.querySelector('.content');

    if (sidebar && content) {
      if (this.showMainNav) {
        const sidebarWidth = sidebar.offsetWidth;
        this.renderer.setStyle(content, 'marginLeft', `${sidebarWidth}px`);
      } else {
        this.renderer.setStyle(content, 'marginLeft', '0');
      }
    }
  }

  private shouldHideNav(url: string): boolean {
    if (this.hideNavRoutes.some((route) => url.startsWith(route))) {
      return true;
    }

    const dynamicRoutePatterns = this.hideNavRoutes
      .filter((route) => route.includes(':'))
      .map((route) => new RegExp(`^${route.replace(/:[^\s/]+/, '[^/]+')}$`));

    return dynamicRoutePatterns.some((pattern) => pattern.test(url));
  }
}