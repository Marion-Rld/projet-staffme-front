import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../services/auth.service';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: any; // Utilisez 'any' pour éviter les erreurs de typage sur les spies
  let router: Router;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken', 'validateToken']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    // Configurez les spies avec 'and.returnValue'
    (authService.getToken as jasmine.Spy).and.returnValue('fake-token');
    (authService.validateToken as jasmine.Spy).and.returnValue(of(true));
  });

  it('should allow access when token is present and valid', (done) => {
    (authService.getToken as jasmine.Spy).and.returnValue('fake-token');
    (authService.validateToken as jasmine.Spy).and.returnValue(of(true)); // Simulating valid token

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeTrue();
      done();
    });
  });

  it('should deny access and navigate to login when no token is present', (done) => {
    (authService.getToken as jasmine.Spy).and.returnValue(null);

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });

  it('should deny access and navigate to login when token is invalid', (done) => {
    (authService.getToken as jasmine.Spy).and.returnValue('fake-token');
    (authService.validateToken as jasmine.Spy).and.returnValue(of(false)); // Simulating invalid token

    authGuard.canActivate().subscribe((result) => {
      expect(result).toBeFalse();
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });
  });
});