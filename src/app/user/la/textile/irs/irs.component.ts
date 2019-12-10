import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/_interface/product';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserUid } from 'src/app/_interface/userUid';
import { ProductService } from 'src/app/product/product.service';
import { UserService } from 'src/app/user/user.service';
import { Productgysz } from 'src/app/_interface/product-gysz';
import { UserSite } from 'src/app/_interface/user-site';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit {

  group = 'körkötelek';
  descreption = 'körkötél';
  public productGroup$: Observable<Product[]>;


  products: Product;
  pr: Product[];
  tooltipposition = 'right';
  user: string;
  gysz: string;
  fid: string;
  public product$: Observable<Productgysz[]>;
  userName: string;
  panel = false;
  num: number;
  site$: Observable<UserSite[]>;
  chosenSite = {name: 'Célállomás'};

  constructor(private location: Location, private _snackBar: MatSnackBar,
              private router: Router, private activeRoute: ActivatedRoute,
              private productService: ProductService,
              private userService: UserService) {}

  ngOnInit() {

    this.userService.getProducts(this.group);
    this.productGroup$ = this.userService.products$;

    this.user = this.activeRoute.snapshot.queryParams.user;
    console.log(this.user);
    this.userService.getOpperantee(this.user);
    this.product$ = this.userService.product$;
    this.userService.getSites(this.user);
    this.site$ = this.userService.sites$;
  }


  delOperantee(gysz) {
    this.userService.delOperantee(gysz, this.user);
    this.product$ = this.userService.product$;
  }
  onSite(site) {
    console.log(site);
    this.chosenSite = site;

  }

  onCancel() {
    this.location.back();
  }

}
