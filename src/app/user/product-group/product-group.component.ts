import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() {
  }
  onCancel() {
    this.location.back();
  }

}
