import { Component, OnInit } from '@angular/core';
import { ProjectCardComponent } from '../../components/projects/project-card/project-card.component';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [ProjectCardComponent, MatIconModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = params.get('id');
      if (projectId) {
        this.loadProject(projectId);
      }
    });
  }

  goBack(): void {
    window.history.back();
  }

  loadProject(projectId: string): void {
    this.projectService.getProjectById(projectId).subscribe((project) => {
      console.log(project);
      this.project = project;
    });
  }
}
