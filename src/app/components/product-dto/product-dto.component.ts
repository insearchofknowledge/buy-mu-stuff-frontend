import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryDto } from 'src/app/dto/category-dto';
import { ProducerDto } from 'src/app/dto/producer-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { CategoryDtoService } from 'src/app/services/category-dto.service';
import { ProducerDtoService } from 'src/app/services/producer-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto',
  templateUrl: './product-dto.component.html',
  styleUrls: ['./product-dto.component.css']
})
export class ProductDtoComponent implements OnInit {

  public products: ProductDto[];
  public categories:CategoryDto[];
  public producers: ProducerDto[];
  addProductForm: FormGroup;
  public deleteProduct: ProductDto;
  

  constructor(private formBuilder:FormBuilder, private productDtoService: ProductDtoService, private categoryDtoService: CategoryDtoService, private producerDtoService: ProducerDtoService) { }
  
  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getProducers();
    this.createForm();

   

}
  public createForm():void{
    this.addProductForm = new FormGroup({
      name: new FormControl(''),
      producerDto: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(''),
      productType: new FormControl(''),
      categoryDto: new FormControl('')
      
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
    // this.addProductForm.get("categoryDto").setValue(1)
    // alert(this.addProductForm.value.categoryDto.name)
    this.productDtoService.addProduct(this.addProductForm.value).subscribe({
      next:(response: ProductDto)=>{
        console.log(response);
        this.getProducts();
        this.createForm();
      },
      error:(errorResponse: HttpErrorResponse)=>{
        console.log(errorResponse);
      }
    })
  }

  public getCategories(): void{
    this.categoryDtoService.getCategories()
    .subscribe((response: CategoryDto[])=>
    {this.categories = response;},
    (error : HttpErrorResponse) =>{alert(error.message)
    }
    );
  }

  public getProducers(): void{
    this.producerDtoService.getProducers()
    .subscribe((response: ProducerDto[])=>
    {this.producers = response;},
    (error : HttpErrorResponse) =>{alert(error.message)
    }
    );
  }

  public onDeleteProduct(productDtoId: number): void {
    this.productDtoService.deleteProduct(productDtoId).subscribe(
      (response: void) => {
        console.log(response);
        // this.getProducts();
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
