import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { ManageUserComponent } from './components/manage-user/manage-user.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/Auth.guard';

const routes: Routes = [

  {path: '', component: LayoutComponent, children: [
    { path: '', redirectTo: '/Login', pathMatch: 'full' }, //deafult Path
    { path: 'Dashboard', component: DashboardComponent,canActivate:[AuthGuard]},
    { path: 'Categories', component: CategoriesComponent , canActivate:[AuthGuard ]},
    { path: 'Products', component: ProductsComponent , canActivate:[AuthGuard ]},
    { path: 'ManageUser', component:ManageUserComponent,canActivate:[AuthGuard]},
    { path: 'Register', component: RegisterComponent,canActivate:[AuthGuard]},
    { path: 'Login', component: LoginComponent},
    { path: 'ForgotPassword', component:ForgotPasswordComponent},


  ]},
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})


export class AppRoutingModule { }
