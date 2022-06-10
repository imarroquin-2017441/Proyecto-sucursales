import { Component, OnInit } from '@angular/core';
import { SucursalRestService } from 'src/app/services/sucursalRest/sucursal-rest.service';
import { SucursalModel } from 'src/app/models/sucursal.model';

@Component({
  selector: 'app-sucursales',
  templateUrl: './sucursales.component.html',
  styleUrls: ['./sucursales.component.css']
})
export class SucursalesComponent implements OnInit {
  sucursal:any;
  sucursalM: SucursalModel;
  sucursalUpdate = {
    _id: "", name:"", direccion:"",
  }

  constructor(
    private sucursalRest: SucursalRestService
  ) { 
    this.sucursalM = new SucursalModel('','', '');
  }

  ngOnInit(): void {
    this.getSucursals();
  }

  getSucursals(){
    this.sucursalRest.getSucursals().subscribe({
      next: (res:any)=> {this.sucursal = res.sucursales;},
      error: (err)=> alert(err.error.message)
    })
  }

  saveSucursal(){
    this.sucursalRest.saveSucursals(this.sucursalM).subscribe({
      next: (res:any)=>{alert(res.message);
      this.getSucursals();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }

  getSucu(idSucursal:any){
    this.sucursalRest.getSucuId(idSucursal).subscribe({
      next: (res:any)=> {
        this.sucursalUpdate._id = res.sucu._id;
        this.sucursalUpdate.name = res.sucu.name;
        this.sucursalUpdate.direccion = res.sucu.direccion;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  UpdateSucu(){
    this.sucursalRest.updateSucursals(this.sucursalUpdate._id, this.sucursalUpdate).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getSucursals();
      },
      error: (err)=> alert(err.error.message || err.error)
    });
  }

  DeleteSucu(idSucu:any){
    this.sucursalRest.deleteSucursals(idSucu).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getSucursals();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }
}
