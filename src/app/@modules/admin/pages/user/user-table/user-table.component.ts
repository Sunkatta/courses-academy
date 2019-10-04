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
}
