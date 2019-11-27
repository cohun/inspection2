import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/_interface/product';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips'
import { map } from 'rxjs/operators';
import { Capacity } from 'src/app/_interface/capacity';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-choice',
  templateUrl: './product-choice.component.html',
  styleUrls: ['./product-choice.component.css']
})

export class ProductChoiceComponent implements OnInit {
  @Input() user: string;
  @Input() group: string;
  @Input() descreption: string;
  @Input() products: Product[];
  public capacities: any = new Set();
  public types: any = new Set();
  public lengths: any = new Set();
  public manufacturers: any = new Set();
  capacity: Product[];
  type: Product[];
  length: Product[];
  manufacturer: Product[];
  product: Product;
  gysz: string;
  tooltipposition = 'right';


  constructor(private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.productIni();

    this.products.forEach(x =>  {
      this.capacities.add(x.capacity);
      this.types.add(x.type);
      this.lengths.add(x.length);
      this.manufacturers.add(x.manufacturer);
    });
    this.capacity = [...this.capacities].sort()
    this.type = [...this.types].sort()
    this.length = [...this.lengths].sort()
    this.manufacturer = [...this.manufacturers].sort()


  }



  productIni() {
    this.product = {
      group: this.group,
      type: '',
      length: '',
      descreption: this.descreption,
      capacity: '',
      manufacturer: ''
    };
  }
  openSnackBar(typ: string, val: string) {
    this.product[typ] = val;
    this._snackBar.open(JSON.stringify(this.product[typ]), 'kiválasztva', {
      duration: 2000,
    });
  }
  onGysz(gysz: string) {
    this.gysz = gysz;
    console.log(this.gysz);

  }
  onOperationStart() {

  }


}
