import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderLine } from '../dto/order-line';
import { ProductDto } from '../dto/product-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderLineService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  public getOrderLines(): Observable<OrderLine[]>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<OrderLine[]>('/api/orderLines',{headers: headers});
  }

  public addOrderLine(orderLine:OrderLine):Observable<OrderLine> {
    console.log("orderline service called trying to add orderLine " + orderLine);
    return this.httpClient.post<OrderLine>(`${this.apiServerUrl}/api/orderLines`, orderLine);
  }

  public deleteOrderLine(orderLineId:number):Observable<void>{
    return this.httpClient.delete<void>(`${this.apiServerUrl}/api/orderLines/${orderLineId}`);
  }
}
