import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let notificationService: jasmine.SpyObj<NotificationService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', [
      'forgotPassword',
    ]);
    authServiceMock.forgotPassword.and.returnValue(of({}));

    const notificationServiceMock = jasmine.createSpyObj(
      'NotificationService',
      ['showSuccess', 'showError']
    );

    const routerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [
        ForgotPasswordComponent,
        HttpClientModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    notificationService = TestBed.inject(
      NotificationService
    ) as jasmine.SpyObj<NotificationService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with email control', () => {
    expect(component.forgotPasswordForm.contains('email')).toBeTruthy();
  });

  it('should make the email control required', () => {
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should validate email format', () => {
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy();
    control?.setValue('valid@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should call authService.forgotPassword on form submit', () => {
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('test@example.com');
    component.onSubmit();
    expect(authService.forgotPassword).toHaveBeenCalledWith('test@example.com');
  });

  it('should show success notification on successful password reset', () => {
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('test@example.com');
    component.onSubmit();
    expect(notificationService.showSuccess).toHaveBeenCalled();
  });

  it('should navigate to login page on successful password reset', () => {
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('test@example.com');
    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show error notification on failed password reset', () => {
    authService.forgotPassword.and.returnValue(
      throwError(() => new Error('error'))
    );
    const control = component.forgotPasswordForm.get('email');
    control?.setValue('test@example.com');
    component.onSubmit();
    expect(notificationService.showError).toHaveBeenCalled();
  });
});
