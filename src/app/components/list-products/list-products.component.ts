import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  listProducts: Product[] = []
  loading: boolean = false;

  constructor(private _productService: ProductoService, private toastr: ToastrService){}

  ngOnInit(): void{
    this.getListProducts()
  }

  getListProducts(){
    this.loading = true;
    setTimeout(() => {
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    })
    },600)
  }

  deleteProduct(id: number){
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('El producto fue eliminado con exito','Producto eliminado')
    })
  }

}
