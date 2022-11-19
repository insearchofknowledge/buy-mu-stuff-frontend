import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { ProductDto } from 'src/app/dto/product-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';
import { ProductDtoService } from 'src/app/services/product-dto.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  public products: ProductDto[];
  public numberOfCartItems: number;
  public cartHasItems: boolean = false;
  public user: User;
  public isAuthenticated = false;

  constructor(
    private productDtoService: ProductDtoService,
    private orderLineDtoService: OrderLineDtoService,
    private authService: AuthService,
    private router: Router) {

    // this.subscriptions.push(
    //   this.authService.isAuthenticated.subscribe(authenticationStatus => {
    //     this.isAuthenticated = authenticationStatus;
    //   })
    // )
  }


  ngOnInit(): void {
    this.getAuthUser();
    console.log(this.isAuthenticated);
    this.getNumberOfCartItems();
    // this.numberOfCartItems = this.orderLineDtoService.getNumberOfItems();
    // this.getProducts();
    this.cartHasItems = false;
  }

  public getAuthUser() {
    // if(this.isAuthenticated){
    //   this.user = this.authService.getUserFromCache();
    // }
    if(this.authService.isUserLoggedin()){
      this.user = this.authService.getUserFromCache();
      this.isAuthenticated = true;
    }else{
      this.isAuthenticated = false;
    }
  }
 
  public getNumberOfCartItems() {
    let length: number = 0;
    this.orderLineDtoService.getUserSpecificOrderLines(this.user.id).subscribe({
      next: (response: OrderLineDto[]) => {
        length = response.length;
        this.numberOfCartItems = length;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }
  
  public logout(){
    this.authService.logout(new HttpHeaders);
    this.router.navigateByUrl('/allProducts').then(()=>{
      window.location.reload();
    });
  }
}
