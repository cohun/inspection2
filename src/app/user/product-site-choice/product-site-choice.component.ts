import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserSite } from 'src/app/_interface/user-site';
import { Site } from 'src/app/_interface/site';
import { Operator } from 'src/app/_interface/operator';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Sit } from "src/app/_interface/chosenSit";

@Component({
  selector: 'app-product-site-choice',
  templateUrl: './product-site-choice.component.html',
  styleUrls: ['./product-site-choice.component.css']
})
export class ProductSiteChoiceComponent implements OnInit {

  @Input() sites: UserSite[];
  @Output() chosenSite: EventEmitter<Sit> = new EventEmitter<Sit>();
  public site: any = new Set();
  public operator: any = new Set();
  sitey: Site[];
  operatory: Operator[];
  sit: Sit = {name: 'Célállomás'};
  isExpanded = false;

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
    this.isExpanded = !this.isExpanded;
    this.sit = val;
    this.chosenSite.emit(this.sit);
    this._snackBar.open(JSON.stringify(this.sit.name), 'kiválasztva', {
      duration: 2000,
    });
  }

}
