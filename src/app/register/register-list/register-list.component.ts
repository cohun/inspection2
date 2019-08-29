import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Record } from "./../../_interface/record.model";
import { RegisterService } from '../register.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from "../../shared/error-handler.service";
import {Router  } from "@angular/router";

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit, AfterViewInit {

  public records: Array<Record> = [];
  public displayedColumns: string[] = ['id', 'user', 'action', 'dateOfAction', 'details', 'list', 'update', 'delete'];
  public smColumns: string[] = ['id', 'dateOfAction', 'details', 'list', 'update', 'delete'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public w = 0;

  constructor(private registerService: RegisterService,
              private errorService: ErrorHandlerService, private router: Router) { }

  ngOnInit() {
    this.registerService.getRecords(this.dataSource);
    const width = window.innerWidth;
    if (width <= 768) {
      console.log('mobile device detected');
      this.w = 0;
    } else {
      console.log('desktop detected');
      this.w = 1;
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public redirectToDetail = (user: string, id: string) => {
    this.router.navigate([`/register/detail`],
    {queryParams: {user,
                  id}});
  }
  public redirectToProductList = (user: string, id: string) => {
    this.router.navigate([`/register/list`],
    {queryParams: {user,
                  id}});
  }
  public redirectToUpdate = (id: string, user:string, date:string) => {
    const url = `/register/update`;
    this.router.navigate([url],
    {queryParams: {id,
                  user,
                date}});
  }
  public redirectToDelete = (id: string, user:string) => {
    const url = `/register/delete`;
    this.router.navigate([url],
      {queryParams: {id,
        user}}
      );
  }

}
