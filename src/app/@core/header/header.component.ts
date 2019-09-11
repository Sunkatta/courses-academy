import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/@shared/models/user/user.model';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isUserLogged = false;
  isAdmin = false;
  user: User;
  userAcquired = false;
  name = '';
  isAuthenticated: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
    this.userAcquired = false;
  }

  ngDoCheck() {
    // if (sessionStorage.getItem('loggedUserId') && !this.user) {
    //   this.authService.getLoggedUser()
    //     .subscribe((response: any) => {
    //       this.user = response;
    //       this.isAdmin = this.user.role === UserRole.Admin;
    //     });
    // }

    if (sessionStorage.length === 0) {
      return;
    }

    if (this.userAcquired === false && this.authService.name !== '') {
      this.userService.getById(this.authService.name)
      .subscribe(
        response => {
          this.name = response.body.firstName;
          this.userAcquired = true;
        }
      );
    }

    if (!sessionStorage.getItem('loggedUserId')) {
      this.user = null;
      this.isAdmin = false;
    }

    // this.name = this.authService.name;
  }

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.signout();
    this.user = null;
    this.isAdmin = false;
  }
}
