import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from 'src/app/@shared/models/user/user.model';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  isUserLogged = false;
  isAdmin = false;
  user: User;

  constructor(private authService: AuthService) { }

  ngOnInit() { }

  ngDoCheck() {
    if (sessionStorage.getItem('loggedUserId') && !this.user) {
      this.authService.getLoggedUser()
        .subscribe((response: User) => {
          this.user = response;
          this.isAdmin = this.user.role === UserRole.Admin;
        });
    }
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.isAdmin = false;
  }
}
