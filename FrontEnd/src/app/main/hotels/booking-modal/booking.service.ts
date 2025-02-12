import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingApiUrl = 'http://localhost:8080/bookings'; // Backend API URL

  constructor(private http: HttpClient) {}

  createBooking(bookingData: any): Observable<any> {
    console.log('Booking API Request:', bookingData); // Debugging before sending request
    return this.http.post(`${this.bookingApiUrl}/reserve`, bookingData);
  }
}