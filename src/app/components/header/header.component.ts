import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductDto } from 'src/app/dto/product-dto';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  products: ProductDto[];

  constructor(private productDtoService: ProductDtoService) { }

  ngOnInit(): void {
    // this.getProducts();
  }

  // public getProducts(): void {
  //   this.productDtoService.getProducts()
  //     .subscribe((response: ProductDto[]) => { this.products = response; },
  //       (error: HttpErrorResponse) => {
  //         alert(error.message)
  //       }
  //     );
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
}
