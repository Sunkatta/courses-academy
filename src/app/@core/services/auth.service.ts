import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
  // Observable navItem source
  private authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this.authNavStatusSource.asObservable();

  private manager = new UserManager(this.getClientSettings());
  public user: User | null;

  constructor(private userService: UserService, private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
      this.authNavStatusSource.next(this.isAuthenticated());
    });
  }

  public getLoggedUser(): Observable<User> {
    if (+sessionStorage.getItem('loggedUserId') === 0) {
      this.router.navigateByUrl('courses');
    } else {
      return new Observable<User>(
        (observer) => {
          this.userService.getById(+sessionStorage.getItem('loggedUserId'))
          .subscribe(
          (response: any) => {
            observer.next(response);
            observer.complete();
          },
            () => {
              this.signout();
            }
          );
        }
      );
    }
  }

  login() {
    return this.manager.signinRedirect();
  }

  signout() {
    this.manager.signoutRedirect();
  }

  async completeAuthentication() {
    new UserManager({response_mode: 'query'}).signinRedirectCallback().then((response) => {
      this.user = response;
      this.authNavStatusSource.next(this.isAuthenticated());
      this.router.navigate(['/courses']);
    });
  }

  isAuthenticated(): boolean {
    return this.user != null && !this.user.expired;
  }

  get authorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  get name(): string {
    return this.user != null ? this.user.profile.sub : '';
  }

  private getClientSettings(): UserManagerSettings {
    return {
      authority: environment.ids4Url,
      client_id: 'ca',
      client_secret: environment.caSecret,
      loadUserInfo: true,
      post_logout_redirect_uri: environment.appUrl + 'courses',
      redirect_uri: environment.appUrl + 'courses',
      response_type: 'code',
      scope: 'openid profile email ca'
    };
  }
}

