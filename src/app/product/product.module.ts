import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing/product-routing.module';
import { SingleProductComponent } from './single-product/single-product.component';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductTableComponent } from './product-table/product-table.component';

@NgModule({
  declarations: [ProductListComponent, SingleProductComponent, ProductTableComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ProductModule { }
