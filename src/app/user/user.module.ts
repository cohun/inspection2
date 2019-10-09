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

@NgModule({
  declarations: [SortimentComponent, ProductGroupComponent, LaComponent, TextileComponent, ChainComponent, RopeComponent, ManualComponent, PoweredComponent, UserSiteComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class UserModule { }
