import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  private baseUrl = 'http://localhost:8080/activity';
  private uploadUrl = 'http://localhost:8080/upload'; // Your file upload endpoint

  constructor(private http: HttpClient) {}

  getActivities(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addActivity(activityData: any): Observable<any> {
    return this.http.post(this.baseUrl, activityData);
  }

  updateActivity(id: number, activityData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, activityData);
  }

  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  // Method to upload files
  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<any>(this.uploadUrl, formData);
  }
}
