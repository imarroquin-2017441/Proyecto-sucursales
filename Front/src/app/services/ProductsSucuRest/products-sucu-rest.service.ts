import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {EmpresaRestService} from '../empresaRest/empresa-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsSucuRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.empresaRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private empresaRest: EmpresaRestService
  ) { }

  getProductsSucu(){
    return this.http.get(environment.baseUrl + 'productoSales/getProducts', {headers: this.httpOptions});
  }

  getProductSucu(idProduct:any){
    return this.http.get(environment.baseUrl + 'productoSales/getProduct/' + idProduct, {headers: this.httpOptions});
  }

  getProductsSucuGrafic(idSucu:any){
    return this.http.get(environment.baseUrl + 'productoSales/getProductsGrafic/'+ idSucu, {headers: this.httpOptions});
  }

// Más Vendidos
  mostSale(){
    return this.http.get(environment.baseUrl + 'productoSales/mostSale', {headers: this.httpOptions});
  }

// Más Stock
  mostStock(){
    return this.http.get(environment.baseUrl + 'productoSales/mostStock', {headers: this.httpOptions});
  }
  // Simulación de venta
  agregarVenta(idProduct:any, params:any){
    let sales = JSON.stringify({"sale":params}) 
    return this.http.post(environment.baseUrl + 'productoSales/Ventas/'+ idProduct, sales, {headers: this.httpOptions});
  }
}
