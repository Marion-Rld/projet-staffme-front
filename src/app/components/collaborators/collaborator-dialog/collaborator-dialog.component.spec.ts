import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorDialogComponent } from './collaborator-dialog.component';
import { HttpClientModule } from '@angular/common/http';

describe('CollaboratorDialogComponent', () => {
  let component: CollaboratorDialogComponent;
  let fixture: ComponentFixture<CollaboratorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorDialogComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
