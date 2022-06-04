import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { EmpresaRestService } from 'src/app/services/empresaRest/empresa-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  empresa: EmpresaModel;

  constructor(
    private empresaRest: EmpresaRestService,
    private router: Router
  ) { 
    this.empresa = new EmpresaModel('', '', '', '', '', '', '')
  }

  ngOnInit(): void {
  }

  login(){
    this.empresaRest.login(this.empresa).subscribe({
      next: (res: any)=>{
        alert(res.message);
        localStorage.setItem('token', res.token);
        localStorage.setItem('identity', JSON.stringify(res.already));
        this.router.navigateByUrl('home');
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

}
