import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from "./error-pages/not-found/not-found.component";
import { ServerErrorComponent } from './error-pages/server-error/server-error.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from "./auth/signup/signup.component";
import { NewComponent } from './new/new.component';
import { ProductModule } from './product/product.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'new', component: NewComponent},
  { path: 'register', loadChildren: './register/register.module#RegisterModule' },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => ProductModule) },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
