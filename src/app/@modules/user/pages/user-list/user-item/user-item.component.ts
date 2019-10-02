import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/@shared/models/user/user.model';
import { UserService } from 'src/app/@core/services/user.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() user: User;
  blockBtnText: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.blockBtnText = this.user.blocked ? 'Unblock' : 'Block';
  }

  blockUser(userId: string): void {
    this.userService.blockUser({
      UserId: userId
    })
    .subscribe(
      (isBlocked: boolean) => {
        this.user.blocked = isBlocked;
        this.blockBtnText = this.user.blocked ? 'Unblock' : 'Block';
      }
    );
  }
}
