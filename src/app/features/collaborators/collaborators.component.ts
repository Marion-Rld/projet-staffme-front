import { Component, OnInit } from '@angular/core';
import { SearchInputComponent } from '../../components/shared/search-input/search-input.component';
import { AddButtonComponent } from '../../components/shared/add-button/add-button.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { User, UserSkill } from '../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { SkillService } from '../../services/skill.service';
import { Skill } from '../../models/skill.model';

@Component({
  selector: 'app-collaborators',
  standalone: true,
  imports: [
    SearchInputComponent,
    AddButtonComponent,
    MatInputModule,
    MatFormFieldModule,
    PaginatedSortableTableComponent,
  ],
  templateUrl: './collaborators.component.html',
  styleUrl: './collaborators.component.scss',
})
export class CollaboratorsComponent implements OnInit {
  displayedColumns: string[] = [
    'lastName',
    'firstName',
    'email',
    'skillsString',
    'job',
  ];

  translatedColumns: { [key: string]: string } = {
    lastName: 'Nom',
    firstName: 'Prénom',
    email: 'Email',
    skillsString: 'Compétences',
    job: 'Poste',
  };
  dataSource = new MatTableDataSource<User & { skillsString?: string }>([]);
  collaborators: (User & { skillsString?: string })[] = [];

  constructor(
    private userService: UserService,
    private skillService: SkillService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCollaborators();
  }

  loadCollaborators(): void {
    this.userService.getUsers().subscribe((collaborators: User[]) => {
      const skillIds = new Set<string>();
      collaborators.forEach((user: User) => {
        user.skills?.forEach((skill: UserSkill) =>
          skillIds.add(skill.skill_id)
        );
      });

      this.skillService
        .getSkillsByIds(Array.from(skillIds))
        .subscribe((skills: Skill[]) => {
          const skillMap = new Map<string, string>(
            skills.map((skill: Skill) => [skill._id, skill.name])
          );
          const collaboratorsWithSkillsString = collaborators.map(
            (user: User) => {
              const skillNames = user.skills
                ?.map((skill: UserSkill) => skillMap.get(skill.skill_id) || '')
                .join(', ');
              return { ...user, skillsString: skillNames || '' };
            }
          );
          this.dataSource.data = collaboratorsWithSkillsString;
        });
    });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getDisplayedColumn(column: string): string {
    return this.translatedColumns[column] || column;
  }

  addCollaboratorToTable(collaborator: User): void {
    this.dataSource.data = [...this.dataSource.data, collaborator];
  }
}
