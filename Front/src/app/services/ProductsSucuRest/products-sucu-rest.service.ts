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
}
