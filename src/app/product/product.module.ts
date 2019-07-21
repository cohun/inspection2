import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing/product-routing.module';
import { SingleProductComponent } from './single-product/single-product.component';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ProductListComponent, SingleProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class ProductModule { }
