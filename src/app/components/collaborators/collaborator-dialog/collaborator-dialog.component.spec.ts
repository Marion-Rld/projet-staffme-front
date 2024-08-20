import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDialogComponent } from './collaborator-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CollaboratorDialogComponent', () => {
  let component: CollaboratorDialogComponent;
  let fixture: ComponentFixture<CollaboratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CollaboratorDialogComponent,
        HttpClientModule,
        BrowserAnimationsModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: { close: jasmine.createSpy('close') },
        },
        { provide: MAT_DIALOG_DATA, useValue: { entity: {} } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
