import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from '../product.service';
import { ProductFid } from 'src/app/_interface/product-fid';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';

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
  public fid = '';
  public product$: Observable<ProductFid[]>;
  public specProduct$: Observable<SpecProduct[]>;

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
    this.product$.pipe(map(res => res.forEach(val => {
      console.log(val.fid); })));
    console.log(this.fid);
    this.productService.loadProdSpec(this.fid);
    this.specProduct$ = this.productService.specProduct$;


  }

}
