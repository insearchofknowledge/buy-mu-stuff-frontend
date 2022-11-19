import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';
import { AllProductsComponent } from '../all-products/all-products.component';

@Component({
  selector: 'app-product-dto-details',
  templateUrl: './product-dto-details.component.html',
  styleUrls: ['./product-dto-details.component.css']
})
export class ProductDtoDetailsComponent implements OnInit {

  public productDto: ProductDto;
  public productDtoId: number;

  constructor(private productDtoService: ProductDtoService) { }

  ngOnInit(): void {
    const fetchedProductDtoId = sessionStorage.getItem('storedProductId');   // we have stored the id of the product in session storage
    if (fetchedProductDtoId) {                                               // check all-products.ts 
      this.productDtoId = Number(fetchedProductDtoId);
    }
    this.getProductDtoById();
  }

  public getProductDtoById() {
    this.productDtoService.getProductById(this.productDtoId).subscribe({
      next: (response: ProductDto) => {
        this.productDto = response;
        console.log(response);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

}
