import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Product } from 'src/app/_interface/product';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit {

  products: Product;
  pr: Product[];
  tooltipposition = 'right';
  form: FormGroup;

  new = [
    {
    site: 'Új beszerzés',
    info: 'Központi raktár',
    products: [
    {
      type: 'irs 10',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '1000 kg',
      manufacturer: 'Gutman',
      gysz: '1531'
    },
    {
      type: 'irs 20',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '2000 kg',
      manufacturer: 'Gutman',
      gysz: '1550'
    },
    {
      type: 'irs 30',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '3000 kg',
      manufacturer: 'Gutman',
      gysz: '1585'
    },
    {
      type: 'irs 40',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '4000 kg',
      manufacturer: 'Gutman',
      gysz: '1590'
    }
  ]
  },
  {
    site: '1. műhely',
    info: 'Mátranovák',
    products: [
    {
      type: 'irs 10',
      length: '5/10 m',
      descreption: 'körkötél',
      capacity: '10000 kg',
      manufacturer: 'Gutman',
      gysz: '990'
    },
    {
      type: 'irs 20',
      length: '4/8 m',
      descreption: 'körkötél',
      capacity: '20000 kg',
      manufacturer: 'Gutman',
      gysz: '990'
    },
    ]
  },
  {
    site: '2. műhely',
    info: 'Mátranovák',
    products: [
    {
      type: 'irs 100',
      length: '1/2 m',
      descreption: 'körkötél',
      capacity: '10000 kg',
      manufacturer: 'Gutman',
      gysz: '1990'
    },
    {
      type: 'irs 200',
      length: '2/4 m',
      descreption: 'körkötél',
      capacity: '20000 kg',
      manufacturer: 'Gutman',
      gysz: '2990'
    },
    ]
  }
  ];

  constructor(private location: Location, private _snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl('', [Validators.required]),
      manufacturer: new FormControl('')
    })
    console.log(this.new.length);
    this.productIni();

  }

  productIni() {
    this.products = {
      group: 'körkötelek',
      type: 'irs',
      length: 'm',
      descreption: 'körkötél',
      capacity: 'kg',
      manufacturer: ''
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data,
        event.previousIndex,
        event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex, event.currentIndex);
    }
  }

  openSnackBar(typ: string, val: string, cap: string) {
    if (typ === 'type') {
      this.products.type = val;
      this.products.capacity = cap;
    } else {
      this.products.length = val;
    }
    this._snackBar.open(JSON.stringify(this.products.type), JSON.stringify(this.products.length), {
      duration: 2000,
    });
  }

  onSubmit(f) {
    console.log(f);

    this.products.manufacturer = f.manufacturer;

  }
  onCancel() {
    this.location.back();
  }

}