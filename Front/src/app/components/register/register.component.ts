import { Component, OnInit } from '@angular/core';
import { EmpresaModel } from 'src/app/models/empresa.model';
import { EmpresaRestService } from 'src/app/services/empresaRest/empresa-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  empresa: EmpresaModel;

  constructor(
    private empresaRest: EmpresaRestService,
    private router: Router
  ) { 
    this.empresa = new EmpresaModel('', '', '', '', '', '', ' CLIENT')
  }

  ngOnInit(): void {
  }

  saveEmpresa(register:any){
    this.empresaRest.register(this.empresa).subscribe({
      next: (res: any)=>{
        alert(res.message);
        return this.router.navigateByUrl('/login')
      },
      error: (err)=> {
        register.reset();
        alert(err.error.message || err.error);
      }
    })
  }

}
