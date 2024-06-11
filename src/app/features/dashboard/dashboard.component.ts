import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule,
    MatTableModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent { projects = [
  { name: 'Projet 1', startDate: '01/01/2023', endDate: '01/06/2023', teams: ['Team A', 'Team B'] },
  { name: 'Projet 2', startDate: '01/02/2023', endDate: '01/07/2023', teams: ['Team C'] },
  { name: 'Projet 3', startDate: '01/03/2023', endDate: '01/08/2023', teams: ['Team A', 'Team C'] }
];

displayedColumns: string[] = ['empty', 'name', 'dates', 'teams'];

teams = ['Team A', 'Team B', 'Team C'];
}
