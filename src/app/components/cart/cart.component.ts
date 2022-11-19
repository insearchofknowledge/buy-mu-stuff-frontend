import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public orderLines: OrderLineDto[] = [];
  public totalCost: number = 0;
  public updateQuantityForm: FormGroup;
  public currentOrderLine: OrderLineDto;
  public currentOrderLineId: number;
  public numberOfItemsIncart: number;
  public isCartEmpty: boolean = false;
  public user: User;

  constructor(
    private orderLineDtoService: OrderLineDtoService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.getUser();
    this.getOrderLines();
    //  this.checkIfCartIsEmpty();
    this.createUpdateQuantityForm();
    this.getTotalCost();
  
  }

  public getUser() {
    this.user = this.authService.getUserFromCache();
  }

  public getOrderLines(): void {
    console.log(this.user);
    this.orderLineDtoService.getUserSpecificOrderLines(this.user.id)    // HARDCODED NEEDS TO BE CHANGED !!!!
      .subscribe((response: OrderLineDto[]): void => {
        this.orderLines = response;
        this.checkIfCartIsEmpty(response);
      },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public checkIfCartIsEmpty(orderLineList: OrderLineDto[]): void {
    if (orderLineList.length == 0) {
      this.isCartEmpty = true;
    }
  }

  public getTotalCost(): void {
    let sum: number = 0;  // IF NOT INITIALIZED IT WILL BE NaN
    this.orderLineDtoService.getUserSpecificOrderLines(this.user.id).subscribe({   // HARDCODED STUFF 
      next: (response: OrderLineDto[]) => {
        response.forEach((item) => {
          sum += item.totalPrice;
        })
        this.totalCost = sum;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public createUpdateQuantityForm() {
    this.updateQuantityForm = new FormGroup({
      quantity: new FormControl('')
    })
  }

  public updateOrderLineQuantity() {
    this.orderLineDtoService.updateOrderLine(this.currentOrderLineId, this.updateQuantityForm.value).subscribe({
      next: (response: OrderLineDto) => {
        console.log(response);
        this.getOrderLines();
        this.getTotalCost();
      },
      error: (errorRersponse: HttpErrorResponse) => {
        console.log(errorRersponse);
      }
    })
  }

  public decrementOrderLineQuantityByOne(orderLineId: number) {
    this.currentOrderLineId = orderLineId;
    // Fetch the orderLine: 
    this.currentOrderLine = this.orderLines.find((orderLineToUpdate) => { return orderLineToUpdate.id === orderLineId; })
    if (this.currentOrderLine.quantity - 1 >= 1) {
      this.updateQuantityForm.setValue({
        quantity: this.currentOrderLine.quantity - 1
      })
      this.updateOrderLineQuantity();
    } else {
      // this.getOrderLines();
      // this.getTotalCost();
    }
  }

  public incrementOrderLineQuantityByOne(orderLineId: number) {
    this.currentOrderLineId = orderLineId;
    // Fetch the orderLine:
    this.currentOrderLine = this.orderLines.find((orderLineToUpdate) => { return orderLineToUpdate.id === orderLineId; })
    // Complete the form which will be the orderLine object sent to backend
    this.updateQuantityForm.setValue({
      quantity: this.currentOrderLine.quantity + 1
    })
    this.updateOrderLineQuantity();
  }

  public modifyOrderLineQuantityFromInput(orderLineId: number) {
    this.currentOrderLineId = orderLineId;
    // Fetch the orderLine:
    this.currentOrderLine = this.orderLines.find((orderLineToUpdate) => { return orderLineToUpdate.id == orderLineId; })
    // Complete the form which will be the orderLine object sent to backend
    this.updateQuantityForm

  }

  public setNumberOfItemsIncart(number: number) {
    this.orderLineDtoService.saveNumberOfItems(number);
  }

  // public populateTheArray(): void {
  //   console.log("method called....")
  //   let totalPrice: number;
  //   this.orderLineDtoService.getOrderLines()
  //     .subscribe((elements: OrderLineDto[]) => {
  //       this.orderLinesForCost = elements; console.log(this.orderLines);
  //       for (let i = 0; i < this.orderLinesForCost.length; i++) {
  //         totalPrice = this.orderLinesForCost[i].totalPrice;
  //         this.trueTotalCost = (this.trueTotalCost + totalPrice);
  //         console.log(this.trueTotalCost);
  //       }
  //       console.log(this.orderLines);
  //     });
  // }

  // public getTrueTotalCost(): number {
  //   var sum: number=0;
  //   this.orderLineDtoService.getOrderLines().subscribe((elements: OrderLineDto[]) => {
  //     elements.forEach((element)=>{
  //       sum = sum + element.totalPrice;
  //       console.log(sum);
  //     })
  //    // return sum;
  //   })

  //   return sum;
  // }

  // public getTotalCost(orderLines: OrderLineDto[]): number {
  //   this.orderLines.forEach((value: OrderLineDto) => {
  //     this.totalCost += value.totalPrice
  //   });
  //   console.log(this.totalCost);
  //   return this.totalCost;
  // }

  // public getTotalCost2():number{
  //   let orderLine = this.orderLines.filter(());
  // }

  public onDeleteOrderLine(orderLineId: number) {
    this.orderLineDtoService.deleteOrderLine(orderLineId).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrderLines();
        this.getTotalCost();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
