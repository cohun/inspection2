import { Component, OnInit, ViewChild } from '@angular/core';
import { Record } from "./../../_interface/record.model";
import { RegisterService } from '../register.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit {

  public records: Array<Record> = [];
  public displayedColumns: string[] = ['id', 'user', 'action', 'dateOfAction', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Record>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private registerService: RegisterService) { }

  ngOnInit() {
    this.registerService.getRecords()
    .subscribe(data => this.dataSource.data = data);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    }

}
