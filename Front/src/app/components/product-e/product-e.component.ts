import { Component, OnInit } from '@angular/core';
import {EmpresaModel } from 'src/app/models/productEmpresa.model';
import { ProductSucuModel } from 'src/app/models/productoSucu.model';
import { SucursalModel } from 'src/app/models/sucursal.model';
import { ProductsEmpresaService } from 'src/app/services/ProductsEmpresa/products-empresa.service';
import { SucursalRestService } from 'src/app/services/sucursalRest/sucursal-rest.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-product-e',
  templateUrl: './product-e.component.html',
  styleUrls: ['./product-e.component.css']
})
export class ProductsEmpresaComponent implements OnInit {
  productosEmpresa: any;
  sucursal: any;
  productosM: EmpresaModel;
  productosUpdate ={
    _id: "", name: "", proveedor: "", stock: 0,
  }
  productoSucursal: ProductSucuModel;
  sucursalM: SucursalModel;

  constructor(
    private productsEmpresa: ProductsEmpresaService,
    private sucursalRest: SucursalRestService
  ) { 
    this.productosM = new EmpresaModel('','', '', 0);
    this.productoSucursal = new ProductSucuModel('', '', 0, 0, '');
    this.sucursalM = new SucursalModel('', '','');
  }

  ngOnInit(): void {
    this.getProducs(); 
    this.getSucursals();
  }
  
  getProducs(){
    this.productsEmpresa.getProducs().subscribe({
      next: (res:any)=> {this.productosEmpresa = res.productos;},
      error: (err)=> alert(err.error.message)
    })
  }
  
  getProdu(idProducts: any){
    this.productsEmpresa.getProducId(idProducts).subscribe({
      next: (res:any)=> {
        this.productosUpdate._id = res.produ._id;
        this.productosUpdate.name = res.produ.name;
        this.productosUpdate.proveedor = res.produ.proveedor;
        this.productosUpdate.stock = res.produ.stock;
      },
      error: (err)=> {
        console.log(err);
      }
    });
  }

  saveProduct(){
    this.productsEmpresa.saveProduct(this.productosM).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getProducs();
        },
      error:(err)=>{alert(err.error.message || err.error)}
    })
  }

  updateProducto(){
    this.productsEmpresa.updateProducto(this.productosUpdate._id, this.productosUpdate).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getProducs();
      },
      error: (err)=> alert(err.error.message || err.error),
    });
  }

  deleteProduct(id:any){
    this.productsEmpresa.deleteProduct(id).subscribe({
      next: (res:any)=>{alert(res.message);
        this.getProducs();
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  getSucursals(){
    this.sucursalRest.getSucursals().subscribe({
      next: (res:any)=> {this.sucursal = res.sucursales;},
      error: (err)=> alert(err.error.message)
    })
  }

  sendProduct(sendProductForm: any){
    this.productsEmpresa.sendProduct(this.productoSucursal).subscribe({

    next:(res:any)=>{
      Swal.fire({
        title: res.message,
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        position:'center'
      })
      this.getSucursals();
      this.getProducs();
      sendProductForm.reset()

    },
    error: (err) => console.log(err.error.message || err.error)
  })
  sendProductForm.reset()
};

}
