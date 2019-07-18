import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Record } from "./../../_interface/record.model";
import { RegisterService } from '../register.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from "../../shared/error-handler.service";
import {Router  } from "@angular/router";
import { AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit, AfterViewInit {

  public records: Array<Record> = [];
  public displayedColumns: string[] = ['id', 'user', 'action', 'dateOfAction', 'details', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private registerService: RegisterService, private db: AngularFirestore,
              private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.registerService.getRecords(this.dataSource);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetail = (id: string) => {
    const url = `/register/detail/${id}`;
    this.router.navigate([url]);
  }
  public redirectToUpdate = (id: string) => {
    const url = `/register/update/${id}`;
    this.router.navigate([url]);
  }
  public redirectToDelete = (id: string) => {
  }

}
