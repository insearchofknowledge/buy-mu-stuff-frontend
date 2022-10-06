import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto',
  templateUrl: './product-dto.component.html',
  styleUrls: ['./product-dto.component.css']
})
export class ProductDtoComponent implements OnInit {

  public products: ProductDto[];

  constructor(private productDtoService: ProductDtoService) { }

  ngOnInit() {
    this.getProducts();
  }

  public getProducts(): void{
    this.productDtoService.getProducts()
    .subscribe((response: ProductDto[])=>
    {this.products = response;},
    (error : HttpErrorResponse) =>{alert(error.message)
    }
    );
  }

}
