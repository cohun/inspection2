import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SpecProdCreation } from 'src/app/_interface/specProd-creation';
import { Location } from '@angular/common';

@Component({
  selector: 'app-product-spec-input',
  templateUrl: './product-spec-input.component.html',
  styleUrls: ['./product-spec-input.component.css']
})
export class ProductSpecInputComponent implements OnInit {
  public fid: string;
  public user: string;
  public type: string;
  public length: string;
  public productForm: FormGroup;
  public specProd: SpecProdCreation
  public num: number;

  constructor(private activeRoute: ActivatedRoute,
              private productService: ProductService,
              private location: Location) { }

  ngOnInit() {
    this.fid = this.activeRoute.snapshot.queryParams.fid;
    this.user = this.activeRoute.snapshot.queryParams.user;
    this.type = this.activeRoute.snapshot.queryParams.type;
    this.length = this.activeRoute.snapshot.queryParams.length;

    this.productForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      site: new FormControl(''),
    });
  }
  createProd(form) {
    this.specProd = {
      id: form.id,
      site: form.site,
      fid: this.fid,
      user: this.user,
    };

    this.productService.checkid(this.specProd.id);
    setTimeout(() => {
      this.num = this.productService.length;
      if (this.num !== 0) {
        alert('Dupla adatbevitel');
        this.location.back();
      } else {
        this.productService.addSpecProd(this.specProd);
        alert('Sikeres adatbevitel');
        this.location.back();
      }
    }, 2000);
}

onCancel() {
  this.location.back();
}

}
