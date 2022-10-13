import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductDtoComponent } from './components/product-dto/product-dto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllProductsComponent } from './components/all-products/all-products.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component:HomeComponent},
  {path: 'products', component:ProductDtoComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'allproducts', component: AllProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
