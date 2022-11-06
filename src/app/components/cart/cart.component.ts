import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public orderLines: OrderLineDto[];
  public totalCost: number = 0;
  public updateQuantityForm: FormGroup;
  public currentOrderLine: OrderLineDto;
  public currentOrderLineId: number;

  constructor(private orderLineDtoService: OrderLineDtoService) { }

  ngOnInit() {
    this.getOrderLines();
    this.createUpdateQuantityForm();
    this.getTotalCost();
  }

  public getOrderLines(): void {
    this.orderLineDtoService.getOrderLines()
      .subscribe((response: OrderLineDto[]): void => { this.orderLines = response; },
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
  }

  public getTotalCost() {
    let sum: number = 0;  // IF NOT INITIALIZED IT WILL BE NaN
    this.orderLineDtoService.getOrderLines().subscribe({
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
