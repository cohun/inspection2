import { Component, OnInit, Input } from '@angular/core';
import { UserSite } from 'src/app/_interface/user-site';
import { Site } from 'src/app/_interface/site';
import { Operator } from 'src/app/_interface/operator';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-site-choice',
  templateUrl: './product-site-choice.component.html',
  styleUrls: ['./product-site-choice.component.css']
})
export class ProductSiteChoiceComponent implements OnInit {

  @Input() sites: UserSite[];
  public site: any = new Set();
  public operator: any = new Set();
  sitey: Site[];
  operatory: Operator[];
  sit: {name: string, info?: string, position?: string}

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sites.forEach(x => {
      x.sites.forEach(y =>
        this.site.add(y))
      x.operators.forEach(o =>
        this.operator.add(o))
    });

    this.sitey = [...this.site].sort()
    this.operatory = [...this.operator].sort()
  }

  openSnackBar(typ: string, val: {name: string, info?: string, position?: string}) {
    this.sit = val;
    this._snackBar.open(JSON.stringify(this.sit.name), 'kiválasztva', {
      duration: 2000,
    });
  }

}
