import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortimentComponent } from './sortiment/sortiment.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [SortimentComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
