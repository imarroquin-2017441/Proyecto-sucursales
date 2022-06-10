import { Component, OnInit } from '@angular/core';
import {EmpresaModel } from 'src/app/models/productEmpresa.model';
import { ProductsEmpresaService } from 'src/app/services/ProductsEmpresa/products-empresa.service';

@Component({
  selector: 'app-product-e',
  templateUrl: './product-e.component.html',
  styleUrls: ['./product-e.component.css']
})
export class ProductsEmpresaComponent implements OnInit {
  productosEmpresa: any;
  productosM: EmpresaModel;
  productosUpdate ={
    _id: "", name: "", proveedor:"", stock: "",
  }

  constructor(
    private productsEmpresa: ProductsEmpresaService
  ) { 
    this.productosM = new EmpresaModel('','', '', 0);
  }

  ngOnInit(): void {
    this.getProducs(); 
  }
  
  getProducs(){
    this.productsEmpresa.getProducs().subscribe({
      next: (res:any)=> {this.productosEmpresa = res.productos;},
      error: (err)=> {alert(err.error.message)}
    })
  }
}
