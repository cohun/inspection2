import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Product } from 'src/app/_interface/product';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { Productgysz } from 'src/app/_interface/product-gysz';
import { UserSite } from 'src/app/_interface/user-site';

@Component({
  selector: 'app-irs',
  templateUrl: './irs.component.html',
  styleUrls: ['./irs.component.css']
})
export class IrsComponent implements OnInit {
  user: string;
  // These 2 have to be updated at every productgroup
  group = 'körkötelek';
  descreption = 'körkötél';
  // .
  chosenSite = {name: 'Célállomás'};

  public productGroup$: Observable<Product[]>;
  public product$: Observable<Productgysz[]>;
  public site$: Observable<UserSite[]>;

  constructor(private location: Location, private activeRoute: ActivatedRoute,
              private userService: UserService) {}

  ngOnInit() {
    this.user = this.activeRoute.snapshot.queryParams.user;

    this.userService.getProducts(this.group);
    this.productGroup$ = this.userService.products$;

    this.userService.getOpperantee(this.user);
    this.product$ = this.userService.product$;
    
    this.userService.getSites(this.user);
    this.site$ = this.userService.sites$;
  }

  onSite(site) {
    console.log(site);
    this.chosenSite = site;
  }

  onCancel() {
    this.location.back();
  }

}
