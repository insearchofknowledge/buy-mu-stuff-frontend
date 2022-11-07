import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderDto } from '../dto/order-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  public addOrder(order: OrderDto): Observable<OrderDto> {
    return this.httpClient.post<OrderDto>(`${this.apiServerUrl}/api/orders`, order);
  }
}