import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/internal/Observable';
import { RecordCreation } from 'src/app/_interface/record-creation';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  public user: string;
  public group: string;
  public id: string;
  public records$: Observable<RecordCreation[]>;

  constructor(private activeRoute: ActivatedRoute,
              private location: Location,
              private productservice: ProductService,
              private router: Router) { }

  ngOnInit() {
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.group = this.activeRoute.snapshot.queryParams.group;
    this.id = this.activeRoute.snapshot.queryParams.id;

    this.productservice.getRecord(this.user);
    this.records$ = this.productservice.record$;
  }

  back() {
    this.location.back();
  }
  onCreate() {
    this.router.navigate(['/product/products/create'],
    {queryParams: { group: this.group  }});
  }

}
