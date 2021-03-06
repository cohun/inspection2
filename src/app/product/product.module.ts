import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductRoutingModule } from './product-routing/product-routing.module';
import { SingleProductComponent } from './single-product/single-product.component';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductTableComponent } from './product-table/product-table.component';
import { ProductDataComponent } from './single-product/product-data/product-data.component';
import { ProductListCreateComponent } from './product-list/product-list-create/product-list-create.component';
import { ProductListInputComponent } from './product-list/product-list-input/product-list-input.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductSpecInputComponent } from './single-product/product-spec-input/product-spec-input.component';
import { CertificateComponent } from './single-product/certificate/certificate.component';
import { PrintComponent } from './single-product/certificate/print/print.component';
import { RemarkInputComponent } from './single-product/certificate/remark-input/remark-input.component';

@NgModule({
  declarations: [ProductListComponent, SingleProductComponent, ProductTableComponent, ProductDataComponent,
    ProductListCreateComponent, ProductListInputComponent, ProductSpecInputComponent, CertificateComponent, PrintComponent, RemarkInputComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
