import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-product-dto-details',
  templateUrl: './product-dto-details.component.html',
  styleUrls: ['./product-dto-details.component.css']
})
export class ProductDtoDetailsComponent implements OnInit {
  public productDto: ProductDto;
  public productDtoId: number;
  public orderLine: OrderLineDto;
  public addOrderLineForm: FormGroup;
  public user: User;
  constructor(private productDtoService: ProductDtoService, private router: Router, private orderLineDtoService: OrderLineDtoService,private authService: AuthService ) { }
  ngOnInit(): void {
    const fetchedProductDtoId = sessionStorage.getItem('storedProductId');   // we have stored the id of the product in session storage
    if (fetchedProductDtoId) {                                               // check all-products.ts
      this.productDtoId = Number(fetchedProductDtoId);
    }
    this.getProductDtoById();
    this.createOrderLineForm();
    this.getUser();
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
  public createOrderLineForm(): void {
    this.addOrderLineForm = new FormGroup({
      quantity: new FormControl(''),
      productDto: new FormControl(''),
      appUserDto: new FormControl('') // hardcoded to 1   in onAddToCart() method
    })
  }
  
  public getUser() {
    this.user = this.authService.getUserFromCache();
  }

  public onAddToCart(productDtoId: number) {
    // Populate the form with the orderLine details:
    this.addOrderLineForm.setValue({
      quantity: 1,
      productDto: productDtoId,
      appUserDto: this.user.id
    });
    console.log(this.addOrderLineForm.value);
    this.orderLineDtoService.addOrderLine(this.addOrderLineForm.value).subscribe({
      next: (response: OrderLineDto) => {
        console.log(response);
        //this.ngOnInit();
        this.router.navigate(['/productDetails']).then(() => {
          window.location.reload();
        });
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
}
