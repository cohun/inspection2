import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { ProductService } from 'src/app/product/product.service';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { Product } from 'src/app/_interface/product';
import { RecordCreation } from "src/app/_interface/record-creation";
import { User } from 'src/app/_interface/user';
import { RemarkCert } from 'src/app/_interface/remarkCert';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit, DoCheck {
  public id: string; //gysz.
  public srsz: string;
  public user: string;
  public specProduct$: Observable<SpecProduct[]>;
  public specPr$: Observable<SpecProduct[]>;
  public fid: string;
  public product$: Observable<Product[]>;
  public record$: Observable<RecordCreation[]>;
  public user$: Observable<User[]>;
  public remark$: Observable<RemarkCert[]>;
  public today = new Date();

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit() {
    this.id = this.activeRoute .snapshot.queryParams.id;
    this.srsz = this.activeRoute .snapshot.queryParams.srsz;
    this.user = this.activeRoute .snapshot.queryParams.user;
    console.log(this.user);

    this.specProduct$ = this.productService.getSpecProduct(this.id);
    this.specPr$ = this.specProduct$;
  setTimeout(() => {
       this.specProduct$.subscribe(x => x.forEach(y => {
        setTimeout(() => {
          this.productService.getProduct(y.fid);
        }, 500);
        }));
    }, 800);




    this.productService.getRec(this.srsz);
    this.record$ = this.productService.rec$;
    this.productService.getUser(this.user);
    this.user$ = this.productService.user$;
    this.productService.getRemark(this.srsz, this.id);
    this.remark$ = this.productService.remark$;



/*     setTimeout(() => {
       this.specProduct$.subscribe(x => x.forEach(y => {
        setTimeout(() => {
          this.productService.getProduct(y.fid);
        }, 500);
        }));
    }, 800);

      this.product$ = this.productService.pr$; */

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    this.specProduct$ = this.productService.getSpecProduct(this.id);


     this.product$ = this.productService.pr$;
  }


}
