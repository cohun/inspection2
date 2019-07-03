import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  password = '';
  email = '';
  agree = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
   });
  }
  onCancel() {
    this.password = '';
    this.email = '';
    this.agree = false;
  }

}
