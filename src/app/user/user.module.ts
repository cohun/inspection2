import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortimentComponent } from './sortiment/sortiment.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { MaterialModule } from "../material/material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { ProductGroupComponent } from './product-group/product-group.component';
import { LaComponent } from './la/la.component';
import { TextileComponent } from './la/textile/textile.component';
import { ChainComponent } from './la/chain/chain.component';
import { RopeComponent } from './la/rope/rope.component';
import { ManualComponent } from './manual/manual.component';
import { PoweredComponent } from './powered/powered.component';
import { UserSiteComponent } from './user-site/user-site.component';
import { IrsComponent } from './la/textile/irs/irs.component';
import { NewSiteComponent } from './user-site/new-site/new-site.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ProductChoiceComponent } from './product-choice/product-choice.component';
import { ProductContainerComponent } from './product-container/product-container.component';
import { ProductSiteChoiceComponent } from './product-site-choice/product-site-choice.component';

@NgModule({
  declarations: [SortimentComponent, ProductGroupComponent, LaComponent, TextileComponent, ChainComponent, RopeComponent, ManualComponent, PoweredComponent, UserSiteComponent, IrsComponent, NewSiteComponent, ProductChoiceComponent, ProductContainerComponent, ProductSiteChoiceComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule
  ]
})
export class UserModule { }
