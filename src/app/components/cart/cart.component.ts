import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderLine } from 'src/app/dto/order-line';
import { OrderLineService } from 'src/app/services/order-line.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public orderLines: OrderLine[];
  public totalCost: number;
  

  constructor(private orderLineService: OrderLineService) { }

  ngOnInit(): void {
    this.getOrderLines();
    // this.getTotalCost(this.orderLines);
    this.totalCost=2;
    console.log(this.orderLines.values);
  }

  public getOrderLines(): void {
    this.orderLineService.getOrderLines()
      .subscribe((response: OrderLine[]) => { this.orderLines = response;},
        (error: HttpErrorResponse) => {
          alert(error.message)
        }
      );
      
  }

  // public populateTheArray():OrderLine[]{
  //   this.orderLineService.getOrderLines().subscribe(this.orderLines)=>;

  //   return this.orderLines;
  // }

  // public getTotalCost(orderLines:OrderLine[]):number {
  //   this.orderLines.forEach( (value)=>{
  //     this.totalCost += value.totalPrice     
  //   });
  //   console.log(this.totalCost);
  //   return this.totalCost;   
  // }

  // public getTotalCost2():number{
  //   let orderLine = this.orderLines.filter(());
  // }

  public onDeleteOrderLine(orderLineId: number) {
    this.orderLineService.deleteOrderLine(orderLineId).subscribe(
      (response: void) => {
        console.log(response);
        this.getOrderLines();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
