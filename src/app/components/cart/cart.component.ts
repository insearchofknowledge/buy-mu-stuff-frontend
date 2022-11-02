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

public orderLines:OrderLine[];

  constructor(private orderLineService: OrderLineService) { }

  ngOnInit(): void {
    this.getOrderLines();
  }

  public getOrderLines():void{
    this.orderLineService.getOrderLines()
      .subscribe((response: OrderLine[]) => { this.orderLines = response; },
    (error: HttpErrorResponse) => {
      alert(error.message)
    }
  );
  }

}
