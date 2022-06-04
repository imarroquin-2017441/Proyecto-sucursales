import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(
    private http: HttpClient
  ) { }

  prueba(){
    return this.http.get(environment.baseUrl + 'empresa/pruebaEmpresa', {headers: this.httpOptions});
  }

  register(params: {}){
    return this.http.post(environment.baseUrl + 'empresa/register', params, {headers:this.httpOptions});
  }

  login(params: {}){
    return this.http.post(environment.baseUrl + 'empresa/login', params, {headers: this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }
}
