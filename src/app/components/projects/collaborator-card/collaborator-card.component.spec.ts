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

    (component.user = {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
      email: 'john.doe@example.com',
      password: 'password',
      skills: [{ skill_id: 'skill1', level_id: 'beginner' }],
    }),
      fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
