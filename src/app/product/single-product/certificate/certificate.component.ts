import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ProductService } from '../../product.service';
import { SpecProduct } from "../../../_interface/specProduct";
import { Observable } from 'rxjs';
import { Location, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements OnInit {
  public specProduct$: Observable<SpecProduct[]>;
  public user: string;
  public srsz: string;
  favoriteSeason: string;
  public act: string;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    const gysz: string = this.activeRoute.snapshot.queryParams.id;
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.srsz = this.activeRoute.snapshot.queryParams.i;

    console.log(gysz, this.user, this.srsz);
    this.specProduct$ = this.productService.certiAct(gysz)

  }
  onClick() {
    console.log(this.act);

    this.location.back();
  }
  f(data) {
    this.act = data;
  }

}
