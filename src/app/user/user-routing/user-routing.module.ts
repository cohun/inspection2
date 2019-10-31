import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SortimentComponent } from "../sortiment/sortiment.component";
import { ProductGroupComponent } from '../product-group/product-group.component';
import { LaComponent } from '../la/la.component';
import { TextileComponent } from '../la/textile/textile.component';
import { RopeComponent } from '../la/rope/rope.component';
import { ChainComponent } from '../la/chain/chain.component';
import { ManualComponent } from '../manual/manual.component';
import { PoweredComponent } from '../powered/powered.component';
import { UserSiteComponent } from '../user-site/user-site.component';
import { IrsComponent } from '../la/textile/irs/irs.component';
import { NewSiteComponent } from '../user-site/new-site/new-site.component';

const routes: Routes = [
  { path: 'user', component: SortimentComponent },
  { path: 'detail', component: ProductGroupComponent},
  { path: 'sites', component: UserSiteComponent},
  { path: 'newSites', component: NewSiteComponent},
  { path: 'la', component: LaComponent},
  { path: 'la/textile', component: TextileComponent},
  { path: 'la/textile/irs', component: IrsComponent},
  { path: 'la/chain', component: ChainComponent},
  { path: 'la/rope', component: RopeComponent},
  { path: 'manual', component: ManualComponent},
  { path: 'powered', component: PoweredComponent}
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule { }
