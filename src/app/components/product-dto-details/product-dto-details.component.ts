import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto-details',
  templateUrl: './product-dto-details.component.html',
  styleUrls: ['./product-dto-details.component.css']
})
export class ProductDtoDetailsComponent implements OnInit {

  public productDto: ProductDto;

  constructor(private productDtoService: ProductDtoService) { }

  ngOnInit(): void {
    this.getProductDtoById();
  }

  public getProductDtoById() {
    this.productDtoService.getProductById(this.productDtoService.getProductDtoId()).subscribe({
      next:(response: ProductDto)=>{
        this.productDto=response;
        console.log(response);
      },
      error: (errorResponse: HttpErrorResponse) =>{
        console.log(errorResponse);
      }
    })
  }
}
