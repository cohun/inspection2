import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Record } from "./../../_interface/record.model";
import { RegisterService } from '../register.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorHandlerService } from "../../shared/error-handler.service";
import {Router  } from "@angular/router";
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UserUid } from 'src/app/_interface/userUid';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})
export class RegisterListComponent implements OnInit, AfterViewInit {

  public records: Array<Record> = [];
  public displayedColumns: string[] = ['id', 'user', 'action', 'dateOfAction', 'details', 'list', 'update', 'delete'];
  public displayedUserColumns: string[] = ['id', 'user', 'action', 'dateOfAction', 'details', 'list'];
  public smColumns: string[] = ['id', 'dateOfAction', 'details', 'list', 'update', 'delete'];
  public smUserColumns: string[] = ['id', 'action', 'dateOfAction', 'details', 'list'];
  public xsColumns: string[] = ['id', 'details', 'list', 'update', 'delete'];
  public xsUserColumns: string[] = ['id', 'dateOfAction', 'details', 'list'];
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  public w = 0;
  userUid = 'Felhasználó';
  us: Observable<UserUid[]>;
  authUser: Subscription;

  constructor(private registerService: RegisterService,
              private authService: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      console.log(this.authService.id);
      this.registerService.getUserName(this.authService.id);
      this.registerService.us$.subscribe(x => {
        x.forEach(y => {
          this.userUid = y.user;
          console.log(this.userUid);
        });
      });
    }, 400);

    setTimeout(() => {
      console.log(this.userUid);
      this.us = this.registerService.us$;
      const who = this.userUid;
      if (who === 'Admin') {
        console.log('if');
        console.log(who);
        this.registerService.getRecords(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else if(who === 'ReadOnly') {
        console.log('if');
        console.log(who);
        this.registerService.getRecords(this.dataSource);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
      else {
        console.log('else');
        console.log(who);
        this.registerService.getUserRecords(this.dataSource, this.userUid);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      }
    }, 800);

    const width = window.innerWidth;
    if (width <= 411) {
      console.log('phone detected');
      this.w = 2;
    } else if (width <= 768) {
      console.log('mobile device detected');
      this.w = 0;
    } else {
      console.log('desktop detected');
      this.w = 1;
    }
  }


  ngAfterViewInit(): void {
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
  public redirectToUpdate = (id: string, user: string, action: string, date: string) => {
    const url = `/register/update`;
    this.router.navigate([url],
    {queryParams: {id,
                  user,
                  action,
                  date}});
  }
  public redirectToDelete = (id: string, user: string) => {
    const url = `/register/delete`;
    this.router.navigate([url],
      {queryParams: {id,
        user}}
      );
  }

}
