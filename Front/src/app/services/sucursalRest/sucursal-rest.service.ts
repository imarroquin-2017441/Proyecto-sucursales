import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {EmpresaRestService} from '../empresaRest/empresa-rest.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalRestService {
  httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.empresaRest.getToken()
  })

  constructor(
    private http: HttpClient,
    private empresaRest: EmpresaRestService
  ) { }

  getSucursals(){
    return this.http.get(environment.baseUrl + 'sucursal/getSucursales', {headers: this.httpOptions});
  }

  getSucuId(id:string){
    return this.http.get(environment.baseUrl + 'sucursal/getSucuId/'+ id, {headers: this.httpOptions});
  }

  saveSucursals(params:{}){
    return this.http.post(environment.baseUrl + 'sucursal/saveSucursal', params, {headers: this.httpOptions});
  }

  deleteSucursals(id:string){
    return this.http.delete(environment.baseUrl + 'sucursal/deleteSucursal/' + id, {headers: this.httpOptions});
  }

  updateSucursals(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'sucursal/updateSucursal/' + id, params, {headers: this.httpOptions})
  }
}
