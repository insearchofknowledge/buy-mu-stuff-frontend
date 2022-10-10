import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto',
  templateUrl: './product-dto.component.html',
  styleUrls: ['./product-dto.component.css']
})
export class ProductDtoComponent implements OnInit {

  public products: ProductDto[];
  addProductForm: FormGroup;

  constructor(private productDtoService: ProductDtoService) { }

  ngOnInit() {
    this.getProducts();

    this.addProductForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      lastName: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+].{8,15}")]),
      city: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")]),
      address: new FormControl('', [Validators.required, Validators.nullValidator, Validators.pattern("[a-zA-Z ]*")])
      //"(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,15}"
    })
  }

  public getProducts(): void{
    this.productDtoService.getProducts()
    .subscribe((response: ProductDto[])=>
    {this.products = response;},
    (error : HttpErrorResponse) =>{alert(error.message)
    }
    );
  }

  public onAddProduct():void{
    // this.userService.register(this.registerForm.value).subscribe({
    //   next:(response: string)=>{
    //     console.log(response);
    //   },
    //   error:(errorResponse: HttpErrorResponse)=>{
    //     console.log(errorResponse);
    //   }
    // })
  }

}
