import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private baseUrl = 'http://localhost:8080/hotels';

  
  constructor(private http: HttpClient) {}

  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

addHotel(hotelData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}`, hotelData).pipe(
    catchError(error => {
      console.error('Full error response:', error);
      return throwError(() => error);
    })
  );
}

  updateHotel(id: number, hotelData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, hotelData);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }


}
