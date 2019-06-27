import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterListComponent } from './register-list/register-list.component';
import { RegisterRoutingModule } from './register-routing/register-routing.module';
import { MaterialModule } from "./../material/material.module";
import { RegisterService } from "./register.service";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RegisterDetailComponent } from './register-detail/register-detail.component';
import { UserDataComponent } from './register-detail/user-data/user-data.component';
import { RegisterCreateComponent } from './register-create/register-create.component';
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [RegisterListComponent, RegisterDetailComponent, UserDataComponent, RegisterCreateComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
