import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsComponent } from './projects.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Project } from '../../models/project.model';
import { of } from 'rxjs';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent, HttpClientModule, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects into dataSource', () => {
    const mockProjects: Project[] = [
      {
        _id: '1',
        name: 'Project 1',
        description: 'Description 1',
        status: 'Active',
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        teams: [],
      },
    ];

    spyOn(component['projectService'], 'getProjects').and.returnValue(
      of(mockProjects)
    );

    component.loadProjects();

    expect(component.dataSource.data).toEqual(mockProjects);
  });

  it('should filter projects by name', () => {
    const mockProjects: Project[] = [
      {
        _id: '1',
        name: 'Project 1',
        description: 'Description 1',
        status: 'Active',
        startDate: new Date(),
        endDate: new Date(),
        budget: 1000,
        teams: [],
      },
      {
        _id: '2',
        name: 'Project 2',
        description: 'Description 2',
        status: 'Completed',
        startDate: new Date(),
        endDate: new Date(),
        budget: 2000,
        teams: [],
      },
    ];

    component.dataSource.data = mockProjects;

    component.applyFilter('Project 1');

    expect(component.dataSource.filteredData.length).toBe(1);
    expect(component.dataSource.filteredData[0].name).toBe('Project 1');
  });

  it('should open the create project dialog and add a new project to the table', () => {
    const mockProject: Project = {
      _id: '3',
      name: 'New Project',
      description: 'New Description',
      status: 'Pending',
      startDate: new Date(),
      endDate: new Date(),
      budget: 3000,
      teams: [],
    };

    spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: () => ({
        subscribe: (callback: (result: Project | null) => void) =>
          callback(mockProject),
      }),
    } as any);

    const initialLength = component.dataSource.data.length;

    component.openCreateProjectDialog();

    expect(component.dataSource.data.length).toBe(initialLength + 1);
    expect(
      component.dataSource.data[component.dataSource.data.length - 1]
    ).toEqual(mockProject);
  });
});
