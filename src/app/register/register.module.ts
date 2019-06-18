import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterRoutingModule } from './register-routing/register-routing.module';
import { MaterialModule } from "./../material/material.module";
import { RegisterService } from "./register.service";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
  declarations: [RegisterListComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
