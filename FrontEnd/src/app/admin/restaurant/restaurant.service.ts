import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private baseUrl = 'http://localhost:8080/restaurants';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addRestaurant(restaurantData: any): Observable<any> {
    return this.http.post(this.baseUrl, restaurantData);
  }

  updateRestaurant(id: number, restaurantData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, restaurantData);
  }

  deleteRestaurant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
