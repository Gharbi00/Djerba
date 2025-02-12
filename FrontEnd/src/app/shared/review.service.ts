// review.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private baseUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  // Method to create a new review
  createReview(review: any): Observable<any> {
    return this.http.post(`${this.baseUrl}reviews/create`, review);
  }

  // Method to get reviews for a specific hotel
  getReviews(hotelId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}reviews/hotel/${hotelId}`);
  }
}
