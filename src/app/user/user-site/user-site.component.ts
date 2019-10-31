import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { UserSite } from 'src/app/_interface/user-site';
import {Router  } from "@angular/router";
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {
  user: string;
  site$: Observable<UserSite[]>;
  person = [{name: "Kovács István", title: 'művezető'}, {name: "Kis József", title: 'műhelyfőnök'}];

  constructor(private activeRoute: ActivatedRoute, private location: Location,
              private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = this.activeRoute.snapshot.queryParams.user;

    this.userService.getSites(this.user);
    this.site$ = this.userService.sites$;

  }

  newSite(sites: [UserSite]) {
    console.log(sites);

    this.router.navigate([`user/newSites`],
    {queryParams: {sites}
  })}

     onCancel() {
      this.location.back();
    }

}
