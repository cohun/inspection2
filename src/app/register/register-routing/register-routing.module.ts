import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterListComponent } from '../register-list/register-list.component';
import { RegisterDetailComponent } from '../register-detail/register-detail.component';
import { UserComponent } from '../user/user.component';
import { UserCreateComponent } from '../user-create/user-create.component';

const routes: Routes = [
  { path: 'records', component: RegisterListComponent },
  { path: 'detail/:id', component: RegisterDetailComponent },
  { path: 'create', component: UserComponent},
  { path: 'user', component: UserCreateComponent}
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
