import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';

import { ResetPasswordComponent } from './reset-password.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'resetPassword',
    ]);
    const notificationServiceSpy = jasmine.createSpyObj('NotificationService', [
      'showSuccess',
      'showError',
    ]);

    await TestBed.configureTestingModule({
      imports: [
        ResetPasswordComponent,
        RouterModule.forRoot([]),
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { token: 'test-token' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.resetForm).toBeDefined();
    expect(component.token).toBe('test-token');
  });

  it('should check if passwords match', () => {
    component.resetForm.controls['password'].setValue('password123');
    component.resetForm.controls['confirmPassword'].setValue('password123');
    expect(component.checkPasswords(component.resetForm)).toBeNull();
  });

  it('should show error if passwords do not match', () => {
    component.resetForm.controls['password'].setValue('password123');
    component.resetForm.controls['confirmPassword'].setValue('password321');
    expect(component.checkPasswords(component.resetForm)).toEqual({
      notSame: true,
    });
  });

  it('should call AuthService resetPassword on form submit', () => {
    authService.resetPassword.and.returnValue(of({}));
    component.resetForm.controls['password'].setValue('password123');
    component.resetForm.controls['confirmPassword'].setValue('password123');
    component.onSubmit();
    expect(authService.resetPassword).toHaveBeenCalledWith(
      'test-token',
      'password123'
    );
  });

  it('should show success notification on successful password reset', () => {
    authService.resetPassword.and.returnValue(of({}));
    component.resetForm.controls['password'].setValue('password123');
    component.resetForm.controls['confirmPassword'].setValue('password123');
    component.onSubmit();
    expect(notificationService.showSuccess).toHaveBeenCalled();
  });

  it('should show error notification on failed password reset', () => {
    authService.resetPassword.and.returnValue(throwError(() => new Error('error')));
    component.resetForm.controls['password'].setValue('password123');
    component.resetForm.controls['confirmPassword'].setValue('password123');
    component.onSubmit();
    expect(notificationService.showError).toHaveBeenCalled();
  });
});
