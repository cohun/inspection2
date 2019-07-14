import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RecordCreation } from "../../_interface/record-creation";
import { RegisterService } from "./../register.service";
import { User } from '../../_interface/user';
import { Observable } from "rxjs";

@Component({
  selector: 'app-register-create',
  templateUrl: './register-create.component.html',
  styleUrls: ['./register-create.component.css']
})
export class RegisterCreateComponent implements OnInit {
  @Input() user: User[];

  myControl = new FormControl();
  options: string[] = [];

  constructor(
    private register: RegisterService,
  ) { }

  ngOnInit() {
    this.getOptions();
    console.log(this.options);
  }

  getOptions() {
    this.user.forEach(element => {
      this.options.push(element.user);
    });
  }

}
