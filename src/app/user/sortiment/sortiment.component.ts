import { Component, OnInit } from '@angular/core';
import {Router  } from "@angular/router";

@Component({
  selector: 'app-sortiment',
  templateUrl: './sortiment.component.html',
  styleUrls: ['./sortiment.component.css']
})
export class SortimentComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  groupDetail() {
    this.router.navigate([`user/detail`])
  }

}
