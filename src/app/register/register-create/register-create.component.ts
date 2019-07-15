import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RecordCreation } from "../../_interface/record-creation";
import { User } from '../../_interface/user';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register-create',
  templateUrl: './register-create.component.html',
  styleUrls: ['./register-create.component.css']
})
export class RegisterCreateComponent implements OnInit {
  @Input() user: User[];
  public userForm: FormGroup;

  myControl = new FormControl();
  options: string[] = [];
  actions = ['Vizsgálat', 'Javítás', 'Karbantartás', 'Üzembehelyezés'];

  constructor(
    private register: RegisterService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getOptions();
    this.userForm = new FormGroup({
      user: new FormControl(''),
      id: new FormControl(''),
      date: new FormControl(new Date()),
      action: new FormControl(''),
    })
  }

  getOptions() {
    this.user.forEach(element => {
      this.options.push(element.user);
    });
  }

  createReg(form) {
    let newReg: RecordCreation = {
      id: form.id,
      user: form.user,
      action: form.action,
      dateOfAction: form.date.toISOString().substring(0, 10)
    }
    this.register.addRecords(newReg);
    console.log(newReg);
    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

}
