import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryDto } from 'src/app/dto/category-dto';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryDtoService } from 'src/app/services/category-dto.service';
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
  public categories: CategoryDto[];
  public user: User;
  public isAuthenticated = false;

  constructor(
    private categoryDtoService: CategoryDtoService, 
    private productDtoService: ProductDtoService, 
    private orderLineDtoService: OrderLineDtoService, 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    // this.getAllProducts();
    this.getUser();
    this.getCategories();
    this.callAppropriateGetMethod();
    this.createOrderLineForm();
    this.getAuthUser();
    
  }

  public callAppropriateGetMethod(): void {
    const fetchedCategoryId = sessionStorage.getItem('storedCategoryId');
    if (fetchedCategoryId) {
      const extractedCategoryId = Number(fetchedCategoryId);
      this.getProductsByCategory(extractedCategoryId);
    } else {
      this.getAllProducts();
    }
  }

  // ========== Displaying products by categories: ==========

  public getCategories(): void {
    this.categoryDtoService.getCategories().subscribe({
      next: (response: CategoryDto[]) => {
        this.categories = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public saveCategoryId(categoryId: number) {
    const categoryIdToBeSaved: number = categoryId;
    sessionStorage.setItem('storedCategoryId', String(categoryIdToBeSaved));
  }

  public resetStorage() {
    sessionStorage.removeItem('storedCategoryId');
  }

  public getProductsByCategory(categoryId: number) {
    this.productDtoService.getProductsByCategory(categoryId).subscribe({
      next: (response: ProductDto[]) => {
        this.products = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  // ========== End of displaying products by categories ==========

  // ========== Displaying all existing products: ==========

  public getAllProducts(): void {
    this.productDtoService.getAllProducts().subscribe({
      next: (response: ProductDto[]) => {
        this.products = response;
        this.resetStorage();
      },
      error: (errorResponse: HttpErrorResponse) => {
        alert(errorResponse.message);
      }
    })
  }

  // ========== END ==========

  public modifyProductDtoIdInService(productDtoId: number) {
    this.productDtoService.setProductDtoId(productDtoId);
  }

  // Storing product ID for product details component
  public saveProductDtoId(productId: number) {
    const productDtoIdToBeSaved: number = productId;
    sessionStorage.setItem('storedProductId', String(productDtoIdToBeSaved));
  }

  // ========== Search product ==========
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
      // this.getAllProducts();
      this.callAppropriateGetMethod();
    }
  }

  // ========== END ==========

  // ========== Getting Logged In User from storage ==========

  public getUser() {
    this.user = this.authService.getUserFromCache();
  }

  // ========== Creating orderline methods: ==========

  public createOrderLineForm(): void {
    this.addOrderLineForm = new FormGroup({
      quantity: new FormControl(''),
      productDto: new FormControl(''),
      appUserDto: new FormControl('') // hardcoded to 1   in onAddToCart() method

    })
  }

  public onAddToCart(productDtoId: number) {

    if(this.isAuthenticated ==false){
      this.router.navigate(['/login']);
    }else{

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
        this.router.navigate(['/allProducts']).then(() => {
          window.location.reload();
        });

      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })}
  }

  // ========== End of orderline creating methods ==========


  public getAuthUser() {
    // if(this.isAuthenticated){
    //   this.user = this.authService.getUserFromCache();
    // }
    if (this.authService.isUserLoggedin()) {
      this.user = this.authService.getUserFromCache();
      this.isAuthenticated = true;
    } else {
      this.isAuthenticated = false;
    }
  }


  // public reloadCurrentRoute() {
  //   let currentUrl = this.router.url;
  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate([currentUrl]);
  //   });
  // }
}
