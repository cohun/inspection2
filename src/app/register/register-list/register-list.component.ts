import { Component, OnInit } from '@angular/core';
import { Record } from "./../../_interface/record.model";
import { RegisterService } from '../register.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit {

  public records: Array<Record> = [];
  public displayedColumns: string[] = ['id', 'user', 'action', 'dateOfAction'];
  public dataSource = new MatTableDataSource<Record>();

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.dataSource.data = this.registerService.getRecords();
  }

}
