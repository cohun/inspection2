import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterRoutingModule } from './register-routing/register-routing.module';
import { MaterialModule } from "./../material/material.module";
import { RegisterService } from "./register.service";

@NgModule({
  declarations: [RegisterListComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
