import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OrderDto } from 'src/app/dto/order-dto';
import { OrderLineDto } from 'src/app/dto/order-line-dto';
import { User } from 'src/app/dto/user';
import { AuthService } from 'src/app/services/auth.service';
import { OrderLineDtoService } from 'src/app/services/order-line-dto.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-dto',
  templateUrl: './order-dto.component.html',
  styleUrls: ['./order-dto.component.css']
})
export class OrderDtoComponent implements OnInit {

  public user: User;
  public orders: OrderDto[];
  public orderLines: OrderLineDto[];

  constructor(
    private authService: AuthService,
    private orderService: OrderService,
    private orderLineService: OrderLineDtoService
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.getOrdersByUser();
  }

  public getUser() {
    this.user = this.authService.getUserFromCache();
  }

  public getOrdersByUser() {
    this.orderService.getOrdersByUserId(this.user.id).subscribe({
      next: (response: OrderDto[]) => {
        console.log(response);
        this.orders = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

  public getOrderLinesByOrderId(orderId: number) {
    this.orderLineService.getOrderLinesByOrderId(orderId).subscribe({
      next: (response: OrderLineDto[]) => {
        this.orderLines = response;
      },
      error: (errorResponse: HttpErrorResponse) => {
        console.log(errorResponse);
      }
    })
  }

}
