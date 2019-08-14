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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserComponent } from './user/user.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { RegisterUpdateComponent } from './register-update/register-update.component';
import { RegisterDeleteComponent } from './register-delete/register-delete.component';
import { RegisterProductListComponent } from './register-product-list/register-product-list.component';

@NgModule({
  declarations: [RegisterListComponent, RegisterDetailComponent, UserDataComponent, RegisterCreateComponent, UserComponent, UserCreateComponent, RegisterUpdateComponent, RegisterDeleteComponent, RegisterProductListComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ],
  providers: [RegisterService],
})
export class RegisterModule { }
