import { Component, OnInit } from '@angular/core';
import { EmpresaRestService } from 'src/app/services/empresaRest/empresa-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token: any;

  constructor(
    private empresaRest: EmpresaRestService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.token = this.empresaRest.getToken();
  }

  logOut(){
    localStorage.clear();
    return this.router.navigateByUrl('/login')
  }

}
