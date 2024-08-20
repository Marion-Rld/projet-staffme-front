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
});
