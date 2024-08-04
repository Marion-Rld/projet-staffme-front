import { Component, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ProjectService } from '../../../services/project.service';
import { Project } from '../../../models/project.model';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics-chart',
  standalone: true,
  imports: [],
  templateUrl: './statistics-chart.component.html',
  styleUrl: './statistics-chart.component.scss',
})
export class StatisticsChartComponent implements AfterViewInit {
  constructor(private projectService: ProjectService) {}

  ngAfterViewInit(): void {
    this.loadChart();
  }

  loadChart() {
    this.projectService.getProjects().subscribe((projects: Project[]) => {

      const completed = projects.filter(
        (project) => project.status === 'completed'
      ).length;
      const ongoing = projects.filter(
        (project) => project.status === 'in progress'
      ).length;
      const planned = projects.filter(
        (project) => project.status === 'planned'
      ).length;

      const ctx = document.getElementById('myChart') as HTMLCanvasElement;
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [
            'Projets complétés',
            'Projets en cours',
            'Projets planifiés',
          ],
          datasets: [
            {
              label: 'Statut des projets',
              data: [completed, ongoing, planned],
              backgroundColor: [
                'rgba(42, 157, 143)', // custom-accent
                'rgba(233, 196, 106)', // custom-secondary
                'rgba(231, 111, 81)', // custom-warn
              ],
              borderColor: [
                'rgba(42, 157, 143)', // custom-accent
                'rgba(233, 196, 106)', // custom-secondary
                'rgba(231, 111, 81)', // custom-warn
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Statut des Projets',
            },
          },
        },
      });
    });
  }
}
