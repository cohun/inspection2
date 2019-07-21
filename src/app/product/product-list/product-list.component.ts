import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public user: string;
  public group: string;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.group = this.activeRoute.snapshot.queryParams.group;

  }

  back() {
    this.location.back();
  }

}
