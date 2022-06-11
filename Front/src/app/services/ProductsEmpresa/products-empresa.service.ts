import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {EmpresaRestService} from '../empresaRest/empresa-rest.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsEmpresaService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.empresaRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private empresaRest: EmpresaRestService
  ) { }

  getProducs(){
    return this.http.get(environment.baseUrl + 'productoEmpresa/getProductos', {headers: this.httpOptions})
  }

  getProducId(id:string){
    return this.http.get(environment.baseUrl + 'productoEmpresa/getProducId/'+ id, {headers: this.httpOptions});
  }

  saveProduct(params:{}){
    return this.http.post(environment.baseUrl + 'productoEmpresa/saveProductoE', params, {headers: this.httpOptions});
  }

  deleteProduct(id:string){
    return this.http.delete(environment.baseUrl + 'productoEmpresa/deleteProducto/' + id, {headers: this.httpOptions});
  }

  updateProducto(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'productoEmpresa/updateProducto/' + id, params, {headers: this.httpOptions})
  }

  sendProduct(params:{}){
    return this.http.post(environment.baseUrl + 'productoEmpresa/sendProduct', params, {headers:this.httpOptions})
  };
}
