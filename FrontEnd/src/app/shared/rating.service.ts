// rating.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  // Method to create or update a rating
  createOrUpdateRating(rating: any): Observable<any> {
    return this.http.post(`${this.baseUrl}ratings/create-or-update`, rating);
  }

  // Method to get ratings for a specific product
  getRatings(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}ratings/product/${productId}`);
  }
}
