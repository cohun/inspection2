import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { ProductFid } from 'src/app/_interface/product-fid';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  @Input() products: ProductFid;
  public product: ProductFid;

  public specProduct$: Observable<SpecProduct[]>;


  constructor(private productService: ProductService, private location: Location) { }

  ngOnInit() {
    this.out(this.products);
    const fid = this.products.fid;
    console.log(fid);
    this.productService.loadProdSpec(fid);
    this.specProduct$ = this.productService.specProduct$;

  }

  out(prod: ProductFid) {
    this.product = prod;
  }
  onClick() {
    this.location.back();
  }

}
