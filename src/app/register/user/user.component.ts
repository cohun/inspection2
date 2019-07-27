import { Component, OnInit } from '@angular/core';
import { RegisterService } from "./../register.service";
import { User } from '../../_interface/user';
import { Observable } from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public users: Observable<User[]>;

  constructor(
    private register: RegisterService
  ) { }

  ngOnInit() {
    this.register.getUserToAutocomplete();
    this.users = this.register.users$;
  }

}
