import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderLineDto } from '../dto/order-line-dto';

@Injectable({
  providedIn: 'root'
})
export class OrderLineDtoService {

  private numberOfItemsInCart: number;

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) { }

  public getAllOrderLines(): Observable<OrderLineDto[]> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<OrderLineDto[]>('/api/orderLines', { headers: headers });
  }

  public getUserSpecificOrderLines(userId: number): Observable<OrderLineDto[]> {
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8')
    console.log('trying to display headers...')
    console.log(headers);
    return this.httpClient.get<OrderLineDto[]>(`${this.apiServerUrl}/api/orderLines/${userId}`, { headers: headers });
  }

  public addOrderLine(orderLine: OrderLineDto): Observable<OrderLineDto> {
    return this.httpClient.post<OrderLineDto>(`${this.apiServerUrl}/api/orderLines`, orderLine);
  }

  public updateOrderLine(orderLineId: number, orderLine: OrderLineDto): Observable<OrderLineDto> {
    return this.httpClient.put<OrderLineDto>(`${this.apiServerUrl}/api/orderLines/${orderLineId}`, orderLine);
  }

  public deleteOrderLine(orderLineId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/api/orderLines/${orderLineId}`);
  }

  saveNumberOfItems(number: number) {
    this.numberOfItemsInCart = number;
  }

  public getNumberOfItems(): number {
    return this.numberOfItemsInCart;
  }
}
