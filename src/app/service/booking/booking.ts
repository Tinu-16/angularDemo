import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking, CreateBookingCommand } from '../../shared/models/CreateBookingCommand ';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private apiUrl = 'https://localhost:7181/api/Booking'; 

  constructor(private http: HttpClient) {}

  addBooking(command: CreateBookingCommand): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}`, command);
  }
}
