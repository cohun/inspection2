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
  @Input() user: string;
  public product: ProductFid;
  public users: string;

  public specProduct$: Observable<SpecProduct[]>;


  constructor(private productService: ProductService, private location: Location) { }

  ngOnInit() {
    this.out(this.products, this.user);
    const fid = this.product.fid;
    const use = this.users;
    console.log(fid, use);
    this.productService.loadProdSpec(fid, use);
    this.specProduct$ = this.productService.specProduct$;

  }

  out(prod: ProductFid, us: string) {
    this.product = prod;
    this.users = us;
  }
  onClick() {
    this.location.back();
  }

}
