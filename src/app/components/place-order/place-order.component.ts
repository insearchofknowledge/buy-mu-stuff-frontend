import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderDto } from 'src/app/dto/order-dto';
import { User } from 'src/app/dto/user';
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
  public userId: number = 1;


  constructor(private userService: UserService, private orderService: OrderService) { }

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
    console.log("getUserById called, here goes nothing.... :D")
    this.userService.getUserById(userId).subscribe({
      next: (response: User) => {
        console.log("printing the response:")
        console.log(response);
        this.orderForm.setValue({
          county: response.county,
          city: response.city,
          street: response.street,
          zipCode: response.zipCode,
          phoneNumber: response.phoneNumber,
          user: 1, // hardcoded
          additionalInformation: ''
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
        
      },
      error:(errorResponse: HttpErrorResponse)=>{
        console.log(errorResponse);
      }
    })
  }
}
