import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterListComponent } from '../register-list/register-list.component';
import { RegisterDetailComponent } from '../register-detail/register-detail.component';
import { RegisterCreateComponent } from '../register-create/register-create.component';

const routes: Routes = [
  { path: 'records', component: RegisterListComponent },
  { path: 'detail/:id', component: RegisterDetailComponent },
  { path: 'create', component: RegisterCreateComponent}
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
