import { Component, OnInit } from '@angular/core';
import { Record } from "../../_interface/record.model";
import { Router, ActivatedRoute } from "@angular/router";
import { RegisterService } from "../register.service";
@Component({
  selector: 'app-register-detail',
  templateUrl: './register-detail.component.html',
  styleUrls: ['./register-detail.component.css']
})
export class RegisterDetailComponent implements OnInit {
  public records: Array<Record> = [];
  public record: Array<Record> = [];
  public showProducts;

  constructor(
    private register: RegisterService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.register.getRecords()
    .subscribe(data => this.records = data);
  }

  getRegisterDetail() {
    const ide: string = this.activeRoute.snapshot.params.id;
    this.record = this.records.filter(rec => rec.id === ide);
    console.log(this.record[0].userDetail.email);
  }

}
