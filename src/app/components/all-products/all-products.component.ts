import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public products: ProductDto[];
  
  constructor(private productDtoService:ProductDtoService) { }

  ngOnInit(): void {
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

  public searchProducts(key: string): void {
    console.log(key);
    const results: ProductDto[] = [];
    for (const product of this.products) {
      if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.producerDto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.productType.valueOf.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || product.categoryDto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(product);
      }
    }
    this.products = results;
    if (results.length === 0 || !key) {
      this.getProducts();
    }
  }
}
