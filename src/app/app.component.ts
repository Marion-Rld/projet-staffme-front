import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MainNavComponent } from "./features/main-nav/main-nav.component";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, MainNavComponent, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule],
})
export class AppComponent {
  title = 'projet-staffme-front';
}
