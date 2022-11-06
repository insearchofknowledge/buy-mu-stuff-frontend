import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductDto } from '../dto/product-dto';
import { environment } from 'src/environments/environment';
import { Form } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProductDtoService {
  

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  public getProducts(): Observable<ProductDto[]>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<ProductDto[]>('/api/products',{headers: headers});
  }

  public addProduct(productFormData: FormData): Observable<ProductDto> {
    return this.httpClient.post<ProductDto>(`${this.apiServerUrl}/api/products`, productFormData);
  }

  public updateProduct(productDtoId:number, productFormData: FormData): Observable<ProductDto> {
    return this.httpClient.put<ProductDto>(`${this.apiServerUrl}/api/products/${productDtoId}`,productFormData);
  }

  public deleteProduct(productDtoId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiServerUrl}/api/products/${productDtoId}`);
  }
}
