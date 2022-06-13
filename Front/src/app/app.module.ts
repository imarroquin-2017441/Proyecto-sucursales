import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { ProductsEmpresaComponent } from './components/product-e/product-e.component';
import { ProductsSucuComponent } from './components/products-sucu/products-sucu.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { ProductGraficComponent } from './components/product-grafic/product-grafic.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotFoundComponent,
    SucursalesComponent,
    ProductsEmpresaComponent,
    ProductsSucuComponent,
    ProductGraficComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
