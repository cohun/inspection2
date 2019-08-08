import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from 'src/app/product/product.service';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { Product } from 'src/app/_interface/product';
import { RecordCreation } from "src/app/_interface/record-creation";

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {
  public id: string; //gysz.
  public srsz: string;
  public specProduct$: Observable<SpecProduct[]>;
  public specPr$: Observable<SpecProduct[]>;
  public fid: string;
  public product$: Observable<Product[]>;
  public record$: Observable<RecordCreation[]>;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.id = this.activeRoute .snapshot.queryParams.id;
    this.srsz = this.activeRoute .snapshot.queryParams.srsz;
    this.specProduct$ = this.productService.getSpecProduct(this.id);
    this.specPr$ = this.specProduct$;
    setTimeout(() => {
      this.specProduct$.subscribe(x => x.forEach(y => {
        setTimeout(() => {
          this.productService.getProduct(y.fid);
        }, 600);
        }));
    }, 600);

    this.product$ = this.productService.pr$;
    this.productService.getRec(this.srsz);
    this.record$ = this.productService.rec$;

  }

}
