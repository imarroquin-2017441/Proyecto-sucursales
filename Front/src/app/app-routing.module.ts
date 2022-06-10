import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { ProductsEmpresaComponent } from './components/product-e/product-e.component';
import { ProductsSucuComponent } from './components/products-sucu/products-sucu.component';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'sucursales', component: SucursalesComponent},
  {path: 'productos', component: ProductsEmpresaComponent},
  {path: 'productosSucu', component: ProductsSucuComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
