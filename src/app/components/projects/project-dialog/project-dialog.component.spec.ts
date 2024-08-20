import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDialogComponent } from './project-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ProjectDialogComponent', () => {
  let component: ProjectDialogComponent;
  let fixture: ComponentFixture<ProjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProjectDialogComponent,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            entity: {
              name: '',
              description: '',
              status: '',
              startDate: new Date(),
              endDate: new Date(),
              budget: 0,
              teams: [],
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
