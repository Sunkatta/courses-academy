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
        // id: [null],
        name: [null, [Validators.required, Validators.minLength(3)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(5)]],
        // role: [UserRole.User],
        // isBlocked: [false]
    });
  }

  onRegister(): void {
    const name = this.registerForm.controls.name.value.split(' ');
    const firstName = name[0].trim();
    const lastName = name[1].trim();

    this.userService.addNewUser({
      FirstName: firstName,
      LastName: lastName,
      Email: this.registerForm.controls.email.value,
      Password: this.registerForm.controls.password.value
    })
    .subscribe(
      () => {
        this.router.navigateByUrl('login');
      },
      () => {
        console.log('FAIL');
      }
    );
  }
}
