import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { ProductFid } from 'src/app/_interface/product-fid';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  @Input() products: ProductFid;
  @Input() user: string;
  @Input() id: string;
  public product: ProductFid;
  public users: string;
  public i: string;
  public gysz: [string];
  public ischecked = false;
  public ch: [boolean];

  public specProduct$: Observable<SpecProduct[]>;


  constructor(private productService: ProductService, private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.out(this.products, this.user, this.id);
    const fid = this.product.fid;
    const use = this.users;
    console.log(fid, use);
    this.productService.loadProdSpec(fid, use);
    this.specProduct$ = this.productService.specProduct$;

  }

  out(prod: ProductFid, us: string, i: string) {
    this.product = prod;
    this.users = us;
    this.i = i;
  }
  onClick() {
    this.location.back();
  }
  onCreate() {
    this.router.navigate([`/product/products/specinput`],
    {queryParams: {fid: this.product.fid,
                  type: this.product.type,
                  length: this.product.length,
                  user: this.users}
    });
  }
  check(id: string) {
    this.ischecked = !this.ischecked;
    console.log(id);
  }
  upload(p) {
    p = !p;
    console.log(p);
  }

}
