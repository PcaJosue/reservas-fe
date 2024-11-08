import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationRequest } from './reservation.request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';
  constructor(private http: HttpClient) { }

  reserveCourse(data: ReservationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }
}
