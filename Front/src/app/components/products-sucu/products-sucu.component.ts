import { Component, OnInit } from '@angular/core';
import { ProductsSucuRestService } from 'src/app/services/ProductsSucuRest/products-sucu-rest.service';
import { ProductSucuModel } from 'src/app/models/productoSucu.model';
import { SucursalRestService } from 'src/app/services/sucursalRest/sucursal-rest.service'

@Component({
  selector: 'app-products-sucu',
  templateUrl: './products-sucu.component.html',
  styleUrls: ['./products-sucu.component.css']
})
export class ProductsSucuComponent implements OnInit {
  productsSucu:any;
  sucursal:any;
  productsSucuM: ProductSucuModel;

  constructor(
    private productSucuRest: ProductsSucuRestService,
    private sucursalRest: SucursalRestService
  ) { 
    this.productsSucuM = new ProductSucuModel('','',0,0,'');
  }

  ngOnInit(): void {
    this.getProductsSucu();
    this.getSucursals();
  }

  getProductsSucu(){
    this.productSucuRest.getProductsSucu().subscribe({
      next: (res:any)=> {this.productsSucu = res.products;},
      error: (err)=> alert(err.error.message)
    })
  }
  getSucursals(){
    this.sucursalRest.getSucursals().subscribe({
      next: (res:any)=> {this.sucursal = res.sucursales;},
      error: (err)=> console.log(err)
    })
  }

}
