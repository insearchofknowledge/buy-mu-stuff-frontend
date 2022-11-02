import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
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

  addProducer(producerDto:ProducerDto):Observable<ProducerDto> {
    return this.httpClient.post<ProducerDto>(`${this.apiServerUrl}/api/producers`, producerDto);
  }

  public updateProducer(producerDtoId:number, producerDto: ProducerDto): Observable<ProducerDto> {
    console.log("update method called from service and pathvariable id is: " +producerDtoId)
    return this.httpClient.put<ProducerDto>(`${this.apiServerUrl}/api/producers/${producerDtoId}`,producerDto);
  }
}
