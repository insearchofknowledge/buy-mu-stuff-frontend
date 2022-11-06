import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  public products: ProductDto[];
  public currentProduct: ProductDto;
  public currentProductId: number;
  public orderLine: OrderLineDto;
  public addOrderLineForm: FormGroup;


  constructor(private productDtoService: ProductDtoService, private orderLineDtoService: OrderLineDtoService) { }

  ngOnInit(): void {
    this.getProducts();
    this.createOrderLineForm();
  }

  public getProducts(): void {
    this.productDtoService.getProducts()
      .subscribe((response: ProductDto[]) => { this.products = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
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

  public createOrderLineForm(): void {
    this.addOrderLineForm = new FormGroup({
      quantity: new FormControl(''),
      productDto: new FormControl(''),
      appUserDto: new FormControl('') // hardcoded to 4

    })
  }

  public onAddToCart(productDtoId: number) {
    // Populate the form with the orderLine details:
    this.addOrderLineForm.setValue({
      quantity: 1,
      productDto: productDtoId,
      appUserDto: 4
    });
    console.log(this.addOrderLineForm.value);
    this.orderLineDtoService.addOrderLine(this.addOrderLineForm.value).subscribe({
      next: (response: OrderLineDto) => {
        console.log(response);
        this.ngOnInit();
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
}
