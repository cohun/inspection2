import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-group',
  templateUrl: './product-group.component.html',
  styleUrls: ['./product-group.component.css']
})
export class ProductGroupComponent implements OnInit {
  public w: number;
  constructor(private location: Location) { }

  ngOnInit() {
    const width = window.innerWidth;
    if (width <= 411) {
      console.log('phone detected');
      this.w = 1;
    } else if (width <= 768) {
      console.log('mobile device detected');
      this.w = 2;
    } else {
      console.log('desktop detected');
      this.w = 4;
    }
  }
  onCancel() {
    this.location.back();
  }

}
