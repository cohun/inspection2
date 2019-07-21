import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from '../product-list/product-list.component';
import { SingleProductComponent } from '../single-product/single-product.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'products/:id', component: SingleProductComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
