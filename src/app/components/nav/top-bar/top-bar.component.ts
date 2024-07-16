import { Component } from '@angular/core';
import {
  Router,
  RouterModule,
  NavigationEnd,
  Event as RouterEvent,
} from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss'],
})
export class TopBarComponent {
  title: string = '';
  userName: string = '';

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter(
          (event: RouterEvent): event is NavigationEnd =>
            event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        if (event.url === '/') {
          this.title = 'Tableau de bord';
        } else if (event.url === '/projects') {
          this.title = 'Projets';
        } else if (event.url === '/teams') {
          this.title = 'Équipes';
        } else if (event.url === '/collaborators') {
          this.title = 'Collaborateurs';
        } else if (event.url === '/user-list') {
          this.title = 'Liste des utilisateurs';
        } else if (/^\/projects\/[^\/]+$/.test(event.url)) {
          this.title = 'Projet';
        } else if (/^\/profile\/[^\/]+$/.test(event.url)) {
          this.title = 'Profil';
        }
      });
  }

  ngOnInit(): void {}
}
