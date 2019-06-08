import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/@core/services/user.service';
import { User } from 'src/app/@shared/models/user/user.model';
import { Router } from '@angular/router';
import { UserRole } from 'src/app/@shared/enums/user-role.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  failedRegisterMsg: string;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        id: [null],
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(5)]],
        role: [UserRole.User],
        isBlocked: [false]
    });
  }

  onRegister(): void {
    this.userService.getAllUsers()
      .subscribe((users: User[]) => {
        const email = this.registerForm.value.email.toLowerCase();
        if (users.find(u => u.email.toLowerCase() === email)) {
          this.failedRegisterMsg = 'Email already taken!';
          return;
        }
        this.userService.addNewUser(this.registerForm.value)
          .subscribe(() => {
            this.router.navigateByUrl('login');
        });
      });
  }
}
