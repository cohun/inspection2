import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from '../product.service';
import { ProductFid } from 'src/app/_interface/product-fid';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  public type: string;
  public length: string;
  public descreption: string;
  public capacity: string;
  public manufacturer: string;
  public user: string;
  public product$: Observable<ProductFid[]>;


  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.type = this.activeRoute.snapshot.queryParams.type;
    this.length = this.activeRoute.snapshot.queryParams.length;
    this.descreption = this.activeRoute.snapshot.queryParams.descreption;
    this.capacity = this.activeRoute.snapshot.queryParams.capacity;
    this.manufacturer = this.activeRoute.snapshot.queryParams.manufacturer;
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.productService.getFid(this.type, this.length, this.descreption, this.capacity, this.manufacturer);

    this.product$ = this.productService.product$;
  }

}
