import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDialogComponent } from './team-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TeamDialogComponent', () => {
  let component: TeamDialogComponent;
  let fixture: ComponentFixture<TeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDialogComponent, HttpClientModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            entity: {
              users: [],
              projects: [],
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values in create mode', () => {
    component.isEditMode = false;
    component.ngOnInit();
    expect(component.teamForm.value).toEqual({
      name: '',
      requiredSkills: [],
      users: [],
    });
  });

  it('should filter users based on selected skills', () => {
    const mockUsers = [
      {
        _id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password456',
        role: 'developer',
        skills: [{ skill_id: 'skill1', level_id: '1' }],
      },
      {
        _id: '2',
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'jane.doe@example.com',
        password: 'password456',
        role: 'designer',
        skills: [{ skill_id: 'skill2', level_id: '1' }],
      },
    ];

    component.users = mockUsers;
    component.filterUsersBySkills(['skill1']);
    expect(component.filteredUsers).toEqual([mockUsers[0]]);

    component.filterUsersBySkills(['skill2']);
    expect(component.filteredUsers).toEqual([mockUsers[1]]);

    component.filterUsersBySkills([]);
    expect(component.filteredUsers).toEqual(mockUsers);
  });
});
