import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterRoutingModule } from './register-routing/register-routing.module';
import { MaterialModule } from "./../material/material.module";
import { RegisterService } from "./register.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterDetailComponent } from './register-detail/register-detail.component';

@NgModule({
  declarations: [RegisterListComponent, RegisterDetailComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
