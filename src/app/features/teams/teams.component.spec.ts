import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsComponent } from './teams.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Project } from '../../models/project.model';
import { User } from '../../models/user.model';
import { Team } from '../../models/team.model';
import { of } from 'rxjs';

describe('TeamsComponent', () => {
  let component: TeamsComponent;
  let fixture: ComponentFixture<TeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamsComponent, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('should load teams with member count and associated projects', () => {
  const mockProjects: Project[] = [
    { _id: '1', name: 'Project 1', description: '', status: '', startDate: new Date(), endDate: new Date(), budget: 1000, teams: [] },
    { _id: '2', name: 'Project 2', description: '', status: '', startDate: new Date(), endDate: new Date(), budget: 2000, teams: [] }
  ];

  const mockUsers: User[] = [
    { _id: '1', lastName: 'Doe', firstName: 'John', email: 'john.doe@example.com', password: 'password', role: 'Developer', skills: [], teams: [], documents: [] },
    { _id: '2', lastName: 'Smith', firstName: 'Jane', email: 'jane.smith@example.com', password: 'password', role: 'Designer', skills: [], teams: [], documents: [] }
  ];

  const mockTeams: Team[] = [
    { _id: '1', name: 'Team 1', users: mockUsers, projects: mockProjects },
    { _id: '2', name: 'Team 2', users: [mockUsers[0]], projects: [] }
  ];

  spyOn(component['teamService'], 'getTeams').and.returnValue(of(mockTeams));

  component.ngOnInit();

  expect(component.teams.data.length).toBe(2);
  expect(component.teams.data[0].memberCount).toBe(2);
  expect(component.teams.data[0].associatedProjects).toBe('Project 1, Project 2');
  expect(component.teams.data[1].memberCount).toBe(1);
  expect(component.teams.data[1].associatedProjects).toBe('');
});

it('should filter teams by name', () => {
  const mockTeams: (Team & { memberCount: number, associatedProjects: string })[] = [
    { _id: '1', name: 'Team A', users: [], projects: [], memberCount: 0, associatedProjects: '' },
    { _id: '2', name: 'Team B', users: [], projects: [], memberCount: 0, associatedProjects: '' }
  ];

  component.dataSource.data = mockTeams;

  component.applyFilter('Team A');

  expect(component.dataSource.filteredData.length).toBe(1);
  expect(component.dataSource.filteredData[0].name).toBe('Team A');
});


it('should open the create team dialog and add a new team to the table', () => {
  const mockTeam: Team = {
    _id: '3',
    name: 'New Team',
    users: [],
    projects: []
  };

  spyOn(component, 'openCreateTeamDialog').and.callThrough();
  spyOn(component['teamService'], 'getTeams').and.returnValue(of([mockTeam]));

  const dialogSpy = spyOn(component['dialog'], 'open').and.returnValue({
    afterClosed: () => ({
      subscribe: (callback: (result: Team | null) => void) =>
        callback(mockTeam),
    }),
  } as any);

  const initialLength = component.teams.data.length;

  component.openCreateTeamDialog();

  expect(dialogSpy).toHaveBeenCalled();
  expect(component.teams.data.length).toBe(initialLength + 1);
  expect(component.teams.data[component.teams.data.length - 1].name).toBe('New Team');
});
  
});
