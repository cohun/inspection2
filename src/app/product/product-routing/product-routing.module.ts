import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { ProductListComponent } from '../product-list/product-list.component';
import { SingleProductComponent } from '../single-product/single-product.component';
import { ProductListCreateComponent } from '../product-list/product-list-create/product-list-create.component';

const routes: Routes = [
  { path: 'products', component: ProductListComponent},
  { path: 'single', component: SingleProductComponent },
  { path: 'products/create', component: ProductListCreateComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductRoutingModule { }
