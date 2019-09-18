import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortimentComponent } from './sortiment/sortiment.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductGroupComponent } from './product-group/product-group.component';
import { LaComponent } from './la/la.component';

@NgModule({
  declarations: [SortimentComponent, ProductGroupComponent, LaComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
