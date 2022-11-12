import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public products: ProductDto[];
  public numberOfCartItems: number = 0;
  public cartHasItems: boolean=false;

  constructor(private productDtoService: ProductDtoService, private orderLineDtoService: OrderLineDtoService) { }

  ngOnInit(): void {
    this.getNumberOfCartItems();
    this.numberOfCartItems = this.orderLineDtoService.getNumberOfItems();
    // this.getProducts();
    this.cartHasItems=false;

  }

  // public getProducts(): void {
  //   this.productDtoService.getProducts()
  //     .subscribe((response: ProductDto[]) => { this.products = response; },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message)
  //       }
  //     );
  //     console.log(this.products);
  // }

  // public searchProducts(key: string): void {
  //   console.log(key);
  //   const results: ProductDto[] = [];
  //   for (const product of this.products) {
  //     if (product.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || product.producerDto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || product.productType.valueOf.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //     || product.categoryDto.name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(product);
  //     }
  //   }
  //   this.products = results;
  //   if (results.length === 0 || !key) {
  //     this.getProducts();
  //   }
  // }

  public getNumberOfCartItems() {
    let length: number = 0;
    this.orderLineDtoService.getUserSpecificOrderLines(1).subscribe({
      next: (response: OrderLineDto[]) => {
        length = response.length;
        this.numberOfCartItems = length;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
}
