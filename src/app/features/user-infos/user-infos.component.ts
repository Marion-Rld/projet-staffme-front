import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { SkillLevelService } from '../../services/skill-level.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Team } from '../../models/team.model';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-user-infos',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    PaginatedSortableTableComponent
  ],
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss'],
  providers: [UserService]
})
export class UserInfosComponent implements OnInit {
  @Input() userId!: string;
  userData: User = {
    _id: '',
    lastName: '',
    firstName: '',
    password: '',
    role: '',
    email: '',
    phoneNumber: '',
    job: '',
    gender: '',
    postalAddress: '',
    skills: []
  };

  displayedColumnsProjects: string[] = ['name', 'description', 'startDate', 'endDate'];
  displayedColumnsTeams: string[] = ['name'];
  displayedColumnsSkills: string[] = ['name', 'level'];

  projects: MatTableDataSource<Project> = new MatTableDataSource<Project>([]);
  teams: MatTableDataSource<Team> = new MatTableDataSource<Team>([]);
  skills: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(
    private userService: UserService, 
    private teamService: TeamService, 
    private projectService: ProjectService, 
    private skillService: SkillService, 
    private skillLevelService: SkillLevelService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((data: User) => {
      this.userData = data;
      this.skills.data = this.userData.skills || [];

      this.teamService.getTeams().subscribe((teams: Team[]) => {
        const userTeams = teams.filter(team => 
          team.users.some(user => user._id === this.userData._id)
        );
        this.teams.data = userTeams;

        // Récupérer les projets pour chaque équipe de l'utilisateur
        const projectRequests = userTeams.map(team => 
          this.projectService.getProjectsByTeamId(team._id)
        );

        // Utiliser forkJoin pour attendre que toutes les requêtes soient terminées
        forkJoin(projectRequests).subscribe((projectsByTeam: Project[][]) => {
          const allProjects = projectsByTeam.flat();  // Aplatir les tableaux de projets
          this.projects.data = allProjects;
        });
      });

      // Charger les compétences de l'utilisateur
      if (this.skills.data.length > 0) {
        const skillRequests = this.skills.data.map(skill => this.skillService.getSkillById(skill.skill_id));
        const skillLevelRequests = this.skills.data.map(skill => this.skillLevelService.getSkillLevelById(skill.level_id)); 

        forkJoin([forkJoin(skillRequests), forkJoin(skillLevelRequests)]).subscribe(([skills, skillLevels]) => {
          this.skills.data = skills.map((skill, index) => ({ ...skill, level: skillLevels[index].name }));
        });
      }
    });
  }
}