import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/@shared/models/user/user.model';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('collapse', [
      state('open', style({
        opacity: '1',
      })),
      state('closed', style({
        opacity: '0',
        height: '0'
      })),
      transition('closed => open', animate(200)),
      transition('open => closed', animate(200))
    ])
  ]
})
export class HeaderComponent implements OnInit, DoCheck {
  isAdmin = false;
  user: User;
  userAcquired = false;
  name = '';
  isAuthenticated: boolean;
  subscription: Subscription;
  collapse = 'closed';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
    this.userAcquired = false;
  }

  ngDoCheck() {
    if (this.userAcquired === false && this.authService.name !== '') {
      this.authService.isAdmin()
      .subscribe(
        (response: boolean) => {
          this.name = this.authService.name;
          this.isAdmin = response;
          this.userAcquired = true;
        }
      );
    }
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.signout();
    this.user = null;
    this.isAdmin = false;
  }

  toggleNavbar() {
    this.collapse = this.collapse === 'open' ? 'closed' : 'open';
  }
}
