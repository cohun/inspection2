import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../product.service";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../../../_interface/product';

@Component({
  selector: 'app-product-list-create',
  templateUrl: './product-list-create.component.html',
  styleUrls: ['./product-list-create.component.css']
})
export class ProductListCreateComponent implements OnInit {
  public productGroup$: Observable<Product[]>;
  public group: string;


  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.group = this.activeRoute.snapshot.queryParams.group;
    this.productService.loadProdGroup(this.group);
    this.productGroup$ = this.productService.productGroup$;
  }

}
