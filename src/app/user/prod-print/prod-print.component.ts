import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Productgysz } from 'src/app/_interface/product-gysz';

@Component({
  selector: 'app-prod-print',
  templateUrl: './prod-print.component.html',
  styleUrls: ['./prod-print.component.css']
})
export class ProdPrintComponent implements OnInit {
  prod: Productgysz[];
  type: string;

  constructor(private activeRoute: ActivatedRoute,) { }

  ngOnInit() {
    this.type = this.activeRoute .snapshot.queryParams.type;
    console.log(this.type);

  }

}
