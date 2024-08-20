import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegisterComponent,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with 5 controls', () => {
    expect(component.registerForm.contains('firstName')).toBeTruthy();
    expect(component.registerForm.contains('lastName')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('confirmPassword')).toBeTruthy();
  });

  it('should make the firstName control required', () => {
    const control = component.registerForm.get('firstName');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  it('should make the email control required and validate email format', () => {
    const control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('not-an-email');
    expect(control?.valid).toBeFalsy();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should validate password pattern', () => {
    const control = component.registerForm.get('password');
    control?.setValue('weakpassword');
    expect(control?.valid).toBeFalsy();

    control?.setValue('StrongP@ssw0rd');
    expect(control?.valid).toBeTruthy();
  });

  it('should check if passwords match', () => {
    component.registerForm.get('password')?.setValue('StrongP@ssw0rd');
    component.registerForm.get('confirmPassword')?.setValue('StrongP@ssw0rd');
    expect(component.passwordsMatch()).toBeTruthy();

    component.registerForm.get('confirmPassword')?.setValue('DifferentP@ssw0rd');
    expect(component.passwordsMatch()).toBeFalsy();
  });

  it('should call onSubmit when form is valid', () => {
    spyOn(component, 'onSubmit');
    component.registerForm.get('firstName')?.setValue('John');
    component.registerForm.get('lastName')?.setValue('Doe');
    component.registerForm.get('email')?.setValue('test@example.com');
    component.registerForm.get('password')?.setValue('StrongP@ssw0rd');
    component.registerForm.get('confirmPassword')?.setValue('StrongP@ssw0rd');

    fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });
});
