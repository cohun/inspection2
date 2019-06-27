import { Component, OnInit, Input } from '@angular/core';
import { Record } from "../../../_interface/record.model";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() public record: Array<Record>;

  constructor() { }

  ngOnInit() {

  }

  pr() {
    console.log(this.record[0].user);
  }
}
