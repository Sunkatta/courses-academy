import { Component, OnInit } from '@angular/core';

import { UserService } from 'src/app/@core/services/user.service';
import { User } from 'src/app/@shared/models/user/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {
  users: User[];
  isAdmin: boolean;
  errorMessage: string;
  blockBtnText: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers()
      .subscribe(
        response => {
          this.users = response.body;
        }
      );
  }

  showError(data: any) {
    this.isAdmin = data.isAdmin;
    this.errorMessage = data.message;
  }

  blockUser(user: User): void {
    if (user.roles.find(r => r.type === 'Admin')) {
      this.isAdmin = true,
      this.errorMessage = 'Admins cannot be blocked!';
      return;
    }

    this.userService.blockUser({
      UserId: user.id
    })
    .subscribe(
      (isBlocked: boolean) => {
        user.blocked = isBlocked;
        this.blockBtnText = user.blocked ? 'Unblock' : 'Block';
      }
    );
  }
}
