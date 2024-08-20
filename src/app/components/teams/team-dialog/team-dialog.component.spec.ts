import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDialogComponent } from './team-dialog.component';
import { HttpClientModule } from '@angular/common/http';

describe('TeamDialogComponent', () => {
  let component: TeamDialogComponent;
  let fixture: ComponentFixture<TeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamDialogComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
