import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterListComponent } from '../register-list/register-list.component';
import { RegisterDetailComponent } from '../register-detail/register-detail.component';
import { UserComponent } from '../user/user.component';
import { UserCreateComponent } from '../user-create/user-create.component';
import { RegisterUpdateComponent } from '../register-update/register-update.component';
import { RegisterDeleteComponent } from '../register-delete/register-delete.component';

const routes: Routes = [
  { path: 'records', component: RegisterListComponent },
  { path: 'detail', component: RegisterDetailComponent },
  { path: 'create', component: UserComponent},
  { path: 'user', component: UserCreateComponent},
  { path: 'update/:id', component: RegisterUpdateComponent},
  { path: 'delete/:id', component: RegisterDeleteComponent}
];

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
