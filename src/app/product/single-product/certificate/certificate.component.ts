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
  favoriteSeason: string; // this is the chosen gysz.
  public gysz: string;
  public act: string;
  public num: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) { }

  ngOnInit() {
    this.gysz = this.activeRoute.snapshot.queryParams.id;
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.srsz = this.activeRoute.snapshot.queryParams.i;

    console.log(this.gysz, this.user, this.srsz);
    this.specProduct$ = this.productService.certiAct(this.gysz)

  }
  onClick() {
    this.location.back();
  }

  f(data) {
    this.act = data;
  }
  onGo() {
    this.productService.checkRemarks(this.favoriteSeason,this.gysz);
    console.log(this.favoriteSeason, this.gysz);

    setTimeout(() => {
      this.num = this.productService.length;
      if (this.num !== 0) {
        alert('Van remark, jkv nyomtatás');
        this.location.back();
      } else {

        alert('Nincs remark, adatbevitel');
        this.location.back();
      }
    }, 1000);
  }

}
