import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { CommonModule } from '@angular/common';
import { SkillService } from '../../../services/skill.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-collaborator-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './collaborator-card.component.html',
  styleUrl: './collaborator-card.component.scss',
})
export class CollaboratorCardComponent implements OnInit {
  @Input() user!: User;
  skillNames: string[] = [];

  constructor(private skillService: SkillService, private router: Router) {}

  ngOnInit(): void {
    this.loadSkillNames();
  }

  loadSkillNames(): void {
    if (this.user.skills) {
      const skillIds = this.user.skills.map(
        (skill) => skill.skill_id as string
      );
      this.skillService.getSkillsByIds(skillIds).subscribe((skills) => {
        this.skillNames = skills.map((skill) => skill.name);
      });
    }
  }

  viewProfile(): void {
    this.router.navigate(['/profile', this.user._id]);
  }
}
