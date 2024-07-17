import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { PaginatedSortableTableComponent } from '../../components/shared/paginated-sortable-table/paginated-sortable-table.component';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { TeamService } from '../../services/team.service';
import { ProjectService } from '../../services/project.service';
import { SkillService } from '../../services/skill.service';
import { forkJoin } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';

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
    teams: [],
    skills: []
  };

  displayedColumnsProjects: string[] = ['name', 'description', 'startDate', 'endDate'];
  displayedColumnsTeams: string[] = ['name'];
  displayedColumnsSkills: string[] = ['name'];

  projects: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  teams: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  skills: MatTableDataSource<any> = new MatTableDataSource<any>([]);

  constructor(private userService: UserService, private teamService: TeamService, private projectService: ProjectService, private skillService: SkillService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserById(this.userId).subscribe((data: User) => {
      this.userData = data;
      this.teams.data = this.userData.teams || [];
      this.skills.data = this.userData.skills || [];
  
      if (this.teams.data.length > 0) {
        const teamRequests = this.teams.data.map(team => this.teamService.getTeamById(team));
        forkJoin(teamRequests).subscribe((teams: any[]) => {
          this.teams.data = teams;
  
          const projectIds = teams.reduce((acc: any[], team) => {
            return acc.concat(team.projects);
          }, []);
  
          const uniqueProjectIds = Array.from(new Set(projectIds.map(project => project._id)));
          const projectRequests = uniqueProjectIds.map(id => this.projectService.getProjectById(id));
  
          forkJoin(projectRequests).subscribe((projects: any[]) => {
            this.projects.data = projects;
          });
        });
      }
  
      if (this.skills.data.length > 0) {
        const skillRequests = this.skills.data.map(skill => this.skillService.getSkillById(skill.skill_id));
        forkJoin(skillRequests).subscribe((skills: any[]) => {
          this.skills.data = skills;
        });
      }
    });
  }  
}