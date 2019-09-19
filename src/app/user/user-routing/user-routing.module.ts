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

const routes: Routes = [
  { path: 'user', component: SortimentComponent },
  { path: 'detail', component: ProductGroupComponent},
  { path: 'la', component: LaComponent},
  { path: 'la/textile', component: TextileComponent},
  { path: 'la/chain', component: ChainComponent},
  { path: 'la/rope', component: RopeComponent},
  { path: 'manual', component: ManualComponent}
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
