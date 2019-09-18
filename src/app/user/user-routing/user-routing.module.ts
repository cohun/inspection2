import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from "@angular/router";
import { SortimentComponent } from "../sortiment/sortiment.component";
import { ProductGroupComponent } from '../product-group/product-group.component';
import { LaComponent } from '../la/la.component';

const routes: Routes = [
  { path: 'user', component: SortimentComponent },
  { path: 'detail', component: ProductGroupComponent},
  { path: 'la', component: LaComponent}
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
