import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { TeamsComponent } from './teams.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Team } from '../../models/team.model';
import { User } from '../../models/user.model';
import { of } from 'rxjs';
import { Project } from '../../models/project.model';

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

  it('should load teams with member count', fakeAsync(() => {
    const mockUsers: User[] = [
      {
        _id: '1',
        lastName: 'Doe',
        firstName: 'John',
        email: 'john.doe@example.com',
        password: 'password',
        role: 'Developer',
        skills: [],
        documents: [],
      },
      {
        _id: '2',
        lastName: 'Smith',
        firstName: 'Jane',
        email: 'jane.smith@example.com',
        password: 'password',
        role: 'Designer',
        skills: [],
        documents: [],
      },
    ];

    const mockTeams: Team[] = [
      { _id: '1', name: 'Team 1', users: mockUsers },
      { _id: '2', name: 'Team 2', users: [mockUsers[0]] },
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
        teams: [mockTeams[0]],
      },
      {
        _id: '2',
        name: 'Project 2',
        description: 'Description 2',
        status: 'Completed',
        startDate: new Date(),
        endDate: new Date(),
        budget: 15000,
        teams: [mockTeams[1]],
      },
    ];

    spyOn(component['teamService'], 'getTeams').and.returnValue(of(mockTeams));
    spyOn(component['projectService'], 'getProjectsByTeamId').and.callFake(
      (teamId: string) => {
        return of(
          mockProjects.filter((project) =>
            project.teams.some((team) => team._id === teamId)
          )
        );
      }
    );

    component.ngOnInit();
    tick();

    expect(component.teams.data.length).toBe(2);
    expect(component.teams.data[0].memberCount).toBe(2);
    expect(component.teams.data[0].associatedProjects).toBe('Project 1');
    expect(component.teams.data[1].memberCount).toBe(1);
    expect(component.teams.data[1].associatedProjects).toBe('Project 2');
  }));

  it('should filter teams by name', () => {
    const mockTeams: (Team & { memberCount: number })[] = [
      { _id: '1', name: 'Team A', users: [], memberCount: 0 },
      { _id: '2', name: 'Team B', users: [], memberCount: 0 },
    ];

    component.teams.data = mockTeams;

    component.applyFilter('Team A');

    expect(component.teams.filteredData.length).toBe(1);
    expect(component.teams.filteredData[0].name).toBe('Team A');
  });

  it('should open the create team dialog and add a new team to the table', () => {
    const mockTeam: Team = {
      _id: '3',
      name: 'New Team',
      users: [],
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
    expect(component.teams.data[component.teams.data.length - 1].name).toBe(
      'New Team'
    );
  });
});
