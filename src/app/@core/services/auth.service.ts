import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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

  private manager = new UserManager(getClientSettings());
  public user: User | null;

  constructor(private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
      this.authNavStatusSource.next(this.isAuthenticated());
    });
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
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: environment.ids4Url,
    client_id: 'ca',
    post_logout_redirect_uri: environment.appUrl,
    redirect_uri: environment.appUrl,
    response_type: 'code',
    scope: 'openid profile email ca'
  };
}
