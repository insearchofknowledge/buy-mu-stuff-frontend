import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProducerDto } from '../dto/producer-dto';

@Injectable({
  providedIn: 'root'
})
export class ProducerDtoService {

  private apiServerUrl = environment.apiBaseUrl;
  constructor(private httpClient: HttpClient) {}

  public getProducers(): Observable<ProducerDto[]>{
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    return this.httpClient.get<ProducerDto[]>('/api/producers',{headers: headers});
  }
}
