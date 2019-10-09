import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-site',
  templateUrl: './user-site.component.html',
  styleUrls: ['./user-site.component.css']
})
export class UserSiteComponent implements OnInit {
  user: string;
  site = ['1. műhely', '2. műhely', 'központi raktár'];
  person = [{name: "Kovács István", title: 'művezető'}, {name: "Kis József", title: 'műhelyfőnök'}];

  constructor(private activeRoute: ActivatedRoute, private location: Location) { }

  ngOnInit() {
    this.user = this.activeRoute.snapshot.queryParams.user;
     }

     onCancel() {
      this.location.back();
    }

}
