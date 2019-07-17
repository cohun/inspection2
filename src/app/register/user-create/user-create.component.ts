import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { User } from "../../_interface/user";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  _user = '';
  public userForm: FormGroup;

  constructor(
    private registerService: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    this._user = this.registerService.ide;
    this.userForm = new FormGroup({
      user: new FormControl(''),
      address: new FormControl('', [Validators.required]),
      partner: new FormControl('', [Validators.required]),
      tel: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required])
    })
  }
  createUser(form) {
    let newUse: User = {
      user: this._user,
      address: form.address,
      partner: form.partner,
      tel: form.tel,
      email: form.email
    }
    this.registerService.addUsers(newUse);
    console.log(newUse);
    alert('Sikeres adatbevitel');
    this.location.back();
  }
  onCancel() {
    this.location.back();
  }

}
