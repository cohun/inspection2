import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../../_interface/user";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() public user: Observable<User[]>;

  constructor() { }

  ngOnInit() {

  }

}
