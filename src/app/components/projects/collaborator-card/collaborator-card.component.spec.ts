import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorCardComponent } from './collaborator-card.component';
import { HttpClientModule } from '@angular/common/http';

describe('CollaboratorCardComponent', () => {
  let component: CollaboratorCardComponent;
  let fixture: ComponentFixture<CollaboratorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollaboratorCardComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CollaboratorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
