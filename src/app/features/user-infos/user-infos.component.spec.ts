import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfosComponent } from './user-infos.component';
import { HttpClientModule } from '@angular/common/http';

describe('UserInfosComponent', () => {
  let component: UserInfosComponent;
  let fixture: ComponentFixture<UserInfosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserInfosComponent, HttpClientModule],
    }).compileComponents();

    fixture = TestBed.createComponent(UserInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
