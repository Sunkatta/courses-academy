import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { UserService } from 'src/app/@core/services/user.service';
import { AuthService } from 'src/app/@core/services/auth.service';

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
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  onRegister(): void {
    const name = this.registerForm.controls.name.value.split(' ');
    const firstName = name[0].trim();
    let lastName = null;
    if (name[1]) {
      lastName = name[1].trim();
    }

    this.userService.addNewUser({
      FirstName: firstName,
      LastName: lastName,
      Email: this.registerForm.controls.email.value,
      Password: this.registerForm.controls.password.value
    })
    .subscribe(
      () => {
        this.authService.login();
      },
      error => {
        if (error.error.errors) {
          this.failedRegisterMsg = 'Registration failed!';
        } else {
          this.failedRegisterMsg = error.error;
        }
        this.registerForm.reset();
      }
    );
  }
}
