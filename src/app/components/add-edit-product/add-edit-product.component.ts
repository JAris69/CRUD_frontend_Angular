import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent {
  form: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string ='Agregar ';

  constructor(private fb: FormBuilder, 
    private _productService: ProductoService, 
    private toastr: ToastrService, 
    private router: Router,
    private aRouter: ActivatedRoute){
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required],
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id')) ;
    
  }

  addProduct(){
    const product: Product = {
      name: this.form.value.name,
      description: this.form.value.description,
      price: this.form.value.price,
      stock: this.form.value.stock
    } 

    this.loading = true;
    if(this.id !== 0){
      //Es editar
      
      product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {       
        this.toastr.success(`El producto ${product.name} fue actualizado exitosamente`,'Producto Modificado')
        this.loading = false;
        this.router.navigate(['/']);
      })

    }else{
      //Es agregar
      this._productService.saveProduct(product).subscribe(() => {
      this.toastr.success(`El producto ${product.name} fue agregado exitosamente`,'Producto Agregado');
      this.loading = false;
    this.router.navigate(['/']);
    })
    }
    


    
  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data:Product) =>{
      this.loading = false;
      this.form.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      })
    })
  }


  ngOnInit(){
    if(this.id != 0){
      //es editar
      this.operacion = 'Editar '
      this.getProduct(this.id);
    }

  }

}
