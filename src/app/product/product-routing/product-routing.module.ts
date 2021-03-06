import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from '../product-list/product-list.component';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductListCreateComponent } from '../product-list/product-list-create/product-list-create.component';
import { ProductSpecInputComponent } from '../single-product/product-spec-input/product-spec-input.component';
import { CertificateComponent } from '../single-product/certificate/certificate.component';
import { PrintComponent } from '../single-product/certificate/print/print.component';
import { RemarkInputComponent } from '../single-product/certificate/remark-input/remark-input.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'single', component: SingleProductComponent },
  { path: 'print', component: PrintComponent },
  { path: 'remark', component: RemarkInputComponent },
  { path: 'products/create', component: ProductListCreateComponent},
  { path: 'products/specinput', component: ProductSpecInputComponent},
  { path: 'single/certificate', component: CertificateComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
