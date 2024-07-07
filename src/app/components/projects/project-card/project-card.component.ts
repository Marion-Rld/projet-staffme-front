import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { EditButtonComponent } from '../../shared/edit-button/edit-button.component';

@Component({
  selector: 'app-project-card',
  standalone: true,
  imports: [CommonModule, MatIconModule, EditButtonComponent],
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss',
})
export class ProjectCardComponent {
  @Input() project: any;

  goBack(): void {
    window.history.back();
  }

  editProject(): void {
    // Edit project
  }

  getCollaboratorsText(): string {
    const count = this.project.teams.reduce(
      (acc: number, team: any) => acc + team.users.length,
      0
    );
    return `${count} collaborateur${count > 1 ? 's' : ''}`;
  }
}
