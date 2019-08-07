import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  public id: string; //gysz.
  public srsz: string;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.id = this.activeRoute .snapshot.queryParams.id;
    this.srsz = this.activeRoute .snapshot.queryParams.srsz;

  }

}
