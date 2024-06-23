import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    PaginatedSortableTableComponent,
    MatFormFieldModule,
    MatInputModule,
    SearchInputComponent,
    AddButtonComponent,
  ],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    'Nom',
    'Description',
    'Date de début',
    'Date de fin',
    'Statut',
  ];

  dataSource = new MatTableDataSource(PROJECTS_DATA);

  ngOnInit(): void {}

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

const PROJECTS_DATA = [
  {
    Nom: 'Projet Alpha',
    Description: 'Développement du site web',
    'Date de début': new Date('2023-01-15'),
    'Date de fin': new Date('2023-06-30'),
    Statut: 'En cours',
  },
  {
    Nom: 'Projet Beta',
    Description: 'Migration de base de données',
    'Date de début': new Date('2023-02-01'),
    'Date de fin': new Date('2023-05-15'),
    Statut: 'Terminé',
  },
  {
    Nom: 'Projet Gamma',
    Description: "Refonte de l'application mobile",
    'Date de début': new Date('2023-03-10'),
    'Date de fin': new Date('2023-09-20'),
    Statut: 'En cours',
  },
  {
    Nom: 'Projet Delta',
    Description: "Mise en place d'une nouvelle infrastructure",
    'Date de début': new Date('2023-04-20'),
    'Date de fin': new Date('2023-12-01'),
    Statut: 'Planifié',
  },
  {
    Nom: 'Projet Epsilon',
    Description: 'Amélioration des performances',
    'Date de début': new Date('2023-05-05'),
    'Date de fin': new Date('2023-11-25'),
    Statut: 'En cours',
  },
  {
    Nom: 'Projet Zeta',
    Description: 'Sécurité et conformité',
    'Date de début': new Date('2023-06-15'),
    'Date de fin': new Date('2024-01-30'),
    Statut: 'Planifié',
  },
  {
    Nom: 'Projet Eta',
    Description: 'Automatisation des processus',
    'Date de début': new Date('2023-07-10'),
    'Date de fin': new Date('2023-10-20'),
    Statut: 'Terminé',
  },
  {
    Nom: 'Projet Theta',
    Description: 'Intégration des services tiers',
    'Date de début': new Date('2023-08-05'),
    'Date de fin': new Date('2023-12-15'),
    Statut: 'En cours',
  },
  {
    Nom: 'Projet Iota',
    Description: "Développement d'une nouvelle fonctionnalité",
    'Date de début': new Date('2023-09-01'),
    'Date de fin': new Date('2024-02-28'),
    Statut: 'Planifié',
  },
  {
    Nom: 'Projet Kappa',
    Description: "Refonte de l'interface utilisateur",
    'Date de début': new Date('2023-10-15'),
    'Date de fin': new Date('2024-04-15'),
    Statut: 'En cours',
  },
];
