import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterListComponent } from '../register-list/register-list.component';
import { RegisterDetailComponent } from '../register-detail/register-detail.component';

const routes: Routes = [
  { path: 'records', component: RegisterListComponent },
  { path: 'detail/:id', component: RegisterDetailComponent }
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
export class RegisterRoutingModule { }
