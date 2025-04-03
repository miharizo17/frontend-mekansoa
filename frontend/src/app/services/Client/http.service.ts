import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }

  get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, { ...options,   headers: this.headers });
  }

  post<T>(url: string, body: any, options = {}): Observable<T> {
    return this.http.post<T>(url, body, { ...options,   headers: this.headers });
  }

  put<T>(url: string, body: any, options = {}): Observable<T> {
    return this.http.put<T>(url, body, { ...options,   headers: this.headers });
  }

  delete<T>(url: string, options = {}): Observable<T> {
    return this.http.delete<T>(url, { ...options,   headers: this.headers });
  }
}
