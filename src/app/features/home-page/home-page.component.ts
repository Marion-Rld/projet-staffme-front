import { Component } from '@angular/core';
import { MainNavComponent } from '../../components/nav/main-nav/main-nav.component';
import { TopBarComponent } from '../../components/nav/top-bar/top-bar.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MainNavComponent, TopBarComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
