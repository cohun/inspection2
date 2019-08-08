import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { SpecProduct } from 'src/app/_interface/specProduct';
import { ProductFid } from 'src/app/_interface/product-fid';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RecordCreation } from "../../../_interface/record-creation";

@Component({
  selector: 'app-product-data',
  templateUrl: './product-data.component.html',
  styleUrls: ['./product-data.component.css']
})
export class ProductDataComponent implements OnInit {
  @Input() products: ProductFid;
  @Input() user: string;
  @Input() id: string;
  @Input() record: RecordCreation;
  public product: ProductFid;
  public users: string;
  public i: string;
  public gysz: [string];
  public ischecked = false;
  public ch: [boolean];
  public action: string;
  public dateOfAction: string;
  public specProduct$: Observable<SpecProduct[]>;
  public act: string;


  constructor(private productService: ProductService, private location: Location,
              private router: Router) { }

  ngOnInit() {
    this.out(this.products, this.user, this.id);
    const fid = this.product.fid;
    const use = this.users;
    this.productService.loadProdSpec(fid, use);
    this.specProduct$ = this.productService.specProduct$;
    this.action = this.record[0].action;
    this.dateOfAction = this.record[0].dateOfAction;
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
  upload(gysz, srsz) {
    // I need to collect action and dateOfAction from records where id=srsz = Done!
    switch (this.action) {
      case 'Vizsgálat':
        this.act = 'inspections';
        break;
      case 'Javítás':
        this.act = 'repair';
        break;
      case 'Üzembehelyezés':
        this.act = 'operationStart';
        break;
      case 'Karbantartás':
        this.act = 'maintenance';
        break;
      default: console.log('Sorry');
    }
    console.log(srsz);
    console.log(this.dateOfAction);
    console.log(this.act);
    this.productService.updateAction(gysz, this.act, srsz, this.dateOfAction);
  }
  public certificate = (user: string, id: string) => {
    this.router.navigate([`product/single/certificate`],
    {queryParams: {user,
                  id,
                  i: this.i}});
  }

}
