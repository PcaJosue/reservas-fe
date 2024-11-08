import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationRequest } from './reservation.request';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/reservations';
  constructor(private http: HttpClient) { }

  reserveCourse(data: ReservationRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}`, data);
  }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}`);
  }

  updateReservation(id: number, date: Date): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}/${id}`, {date});
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
