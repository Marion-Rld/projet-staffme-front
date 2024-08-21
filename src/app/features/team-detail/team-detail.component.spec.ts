import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamDetailComponent } from './team-detail.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { of } from 'rxjs';
import { Project } from '../../models/project.model';

describe('TeamDetailComponent', () => {
  let component: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TeamDetailComponent,
        RouterModule.forRoot([]),
        HttpClientModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: MAT_DIALOG_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load team and team users by teamId', () => {
    const mockTeam: Team = {
      _id: '1',
      name: 'Team 1',
      users: [{ _id: 'user1' }, { _id: 'user2' }] as User[],
    };

    const mockUsers: User[] = [
      {
        _id: 'user1',
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'Developer',
      },
      {
        _id: 'user2',
        lastName: 'Smith',
        firstName: 'Jane',
        email: 'jane.smith@example.com',
        password: 'password',
        role: 'Designer',
      },
    ];

    const mockProjects: Project[] = [
      {
        _id: '1',
        name: 'Project 1',
        description: 'Description 1',
        status: 'InProgress',
        startDate: new Date(),
        endDate: new Date(),
        budget: 10000,
        teams: [mockTeam],
      },
    ];

    spyOn(component['teamService'], 'getTeamById').and.returnValue(
      of(mockTeam)
    );
    spyOn(component['userService'], 'getUsersByIds').and.returnValue(
      of(mockUsers)
    );
    spyOn(component['projectService'], 'getProjectsByTeamId').and.returnValue(
      of(mockProjects)
    );

    component.loadTeam('1');

    expect(component.team).toEqual(mockTeam);
    expect(component.teamUsers).toEqual(mockUsers);
    expect(component.teamProjects).toEqual(mockProjects);
  });

  it('should return correct collaborators text', () => {
    component.team.users = [{ _id: 'user1' }, { _id: 'user2' }] as User[];

    let text = component.getCollaboratorsText();
    expect(text).toBe('2 collaborateurs');

    component.team.users = [{ _id: 'user1' }] as User[];
    text = component.getCollaboratorsText();
    expect(text).toBe('1 collaborateur');
  });

  it('should refresh team by calling loadTeam', () => {
    spyOn(component, 'loadTeam');
    component.team._id = '1';

    component.refreshTeam();

    expect(component.loadTeam).toHaveBeenCalledWith('1');
  });

  it('should delete team and navigate back', () => {
    const mockTeam: Team = {
      _id: '1',
      name: 'Mock Team',
      users: [],
    };

    spyOn(component['teamService'], 'deleteTeam').and.returnValue(of(mockTeam));
    spyOn(component, 'goBack');

    component.team._id = '1';
    component.deleteTeam();

    expect(component['teamService'].deleteTeam).toHaveBeenCalledWith('1');
    expect(component.goBack).toHaveBeenCalled();
  });
});
