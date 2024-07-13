// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_day } from './models/day';

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private apiUrl = 'http://localhost:8000/day';

  constructor(private http: HttpClient) {}

  getDay(): Observable<MM_day[]> {
    return this.http.get<MM_day[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
