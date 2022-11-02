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
}
