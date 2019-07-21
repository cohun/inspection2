import { Component, OnInit, Input } from '@angular/core';
import { User } from "../../../_interface/user";
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../register.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {
  @Input() public user: Observable<User[]>;
  isuser = false;
  us = '';
  public ide = '';
  selected = '';

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.user
    .subscribe(
      result => {
          result.forEach(val => this.us = val.user );
      });

    this.ide = this.activeRoute.snapshot.params.id;
}

  onClick() {
    this.registerService.ide = this.ide;
    const url = `/register/user`;
    this.router.navigate([url]).then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err); // when there's an error
    });
  }

  routeToProducts() {
    this.router.navigate(['/product/products'],
    {queryParams: {user: this.ide,
                  group: this.selected  }});
  }
}
