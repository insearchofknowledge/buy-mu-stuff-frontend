import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderDto } from 'src/app/dto/order-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit {

  public currentUser: User;
  public orderForm: FormGroup;
  public userId: number = this.authService.getUserFromCache().id;


  constructor(
    private userService: UserService, 
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    this.createOrderForm();
    this.getUserById(this.userId);
    // this.getDeliveryDetailsFromUserProfile();
  }

  public createOrderForm(): void {
    this.orderForm = new FormGroup({
      county: new FormControl(''),
      city: new FormControl(''),
      street: new FormControl(''),
      zipCode: new FormControl(''),
      phoneNumber: new FormControl(''),
      user: new FormControl(''),  
      additionalInformation: new FormControl('')
    })
  }

  public getUserById(userId: number) {
    this.userService.getUserById(userId).subscribe({
      next: (response: User) => {
        this.orderForm.setValue({
          county: response.county,
          city: response.city,
          street: response.street,
          zipCode: response.zipCode,
          phoneNumber: response.phoneNumber,
          user: this.userId,
          additionalInformation: ('')
        })
        console.log("trying to print populatedForm...")
        console.log(this.orderForm.value);
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public placeOrder():void{
    console.log("place order button presse place order called...")
    this.orderService.addOrder(this.orderForm.value).subscribe({
      next: (response: OrderDto) =>{
        console.log(response);
        
        this.router.navigateByUrl('/thankYou').then(()=>{
          window.location.reload();
        });
      },
      error:(errorResponse: HttpErrorResponse)=>{
        console.log(errorResponse);
      }
    })
  }
}
