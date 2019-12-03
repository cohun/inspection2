import { Component, OnInit, Input } from '@angular/core';
import { Productgysz } from 'src/app/_interface/product-gysz';

@Component({
  selector: 'app-product-container',
  templateUrl: './product-container.component.html',
  styleUrls: ['./product-container.component.css']
})
export class ProductContainerComponent implements OnInit {
  @Input() user: string;
  @Input() group: string;
  @Input() descreption: string;
  @Input() products: Productgysz[];

  constructor() { }

  ngOnInit() {
    console.log(this.products);

  }

}
