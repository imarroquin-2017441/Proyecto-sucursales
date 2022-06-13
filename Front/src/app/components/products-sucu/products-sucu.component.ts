import { Component, OnInit } from '@angular/core';
import { ProductsSucuRestService } from 'src/app/services/ProductsSucuRest/products-sucu-rest.service';
import { ProductSucuModel } from 'src/app/models/productoSucu.model';
import { SucursalRestService } from 'src/app/services/sucursalRest/sucursal-rest.service'
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-sucu',
  templateUrl: './products-sucu.component.html',
  styleUrls: ['./products-sucu.component.css']
})
export class ProductsSucuComponent implements OnInit {
  productsSucu:any=[];
  sucursal:any;
  idProducts:any;
  idProduct:any;
  sale:any;
  stock:any;
  productsSucuM: ProductSucuModel;
  idSucu:any;
  arrayProductsOffice: any;


  chartOptions1 = {
    responsive: true,
    scales: {
        yAxes: [{
                display: true,
                ticks: {
                    beginAtZero: true
                }
            }]
    }
  };
  chartLabels1: any = [];
  chartLegend1 = true;
  chartPlugins1 = [];

  chartData1: any = [{
     data: [], 
     label: 'SALES' 
    }];

    chartColors: any = [
      {
        backgroundColor: [],
      },
  ];

  constructor(
    private productSucuRest: ProductsSucuRestService,
    private sucursalRest: SucursalRestService,
    public activatedRoute: ActivatedRoute
  ) { 
    this.productsSucuM = new ProductSucuModel('','',0,0,'');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((idRuta)=>{
      this.idSucu = idRuta.get("id");
    });
    this.getProductsSucu();
    this.getSucursals();
    this.getProductsGrafic();
  }

  getProductsGrafic(){
    this.productSucuRest.getProductsSucuGrafic(this.idSucu).subscribe({
      next: (res: any) => {
        this.arrayProductsOffice = res.products;
        this.arrayProductsOffice.forEach((product: any) => {
            this.chartLabels1.push(product.name);
            this.chartData1[0].data.push(product.sales);
            this.chartColors[0].backgroundColor.push(
              `#${Math.floor(Math.random() * 16777215).toString(16)}`
            );
        });
      },
      error: (err) => {
        Swal.fire({
          title: err.error.message || err.error,
          icon: 'error',
          showConfirmButton: false,
          timer: 3000
        });
      }
    });
  }
  
  getProductSucu(idProduct:any){
    this.productSucuRest.getProductSucu(idProduct).subscribe({
      next: (res:any)=> {
        this.idProduct = res.product._id;},
      error: (err)=> alert(err.error.message)
    })
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

  mostSales(){
    this.productSucuRest.mostSale().subscribe({
      next: (res:any)=>{ 
        this.productsSucu = res.productsMostSales},
      error: (err)=> console.log(err)
    })
  }

  mostStock(){
    this.productSucuRest.mostStock().subscribe({
      next: (res:any)=>{ 
        this.productsSucu = res.productsMostStock},
      error: (err)=> console.log(err)
    })
  }

  agregarVenta(){
    this.productSucuRest.agregarVenta(this.idProduct, this.sale).subscribe({
      next: (res:any)=>{this.getProductsSucu()},
      error: (err)=> console.log(err)
    })
  }
  




}
