// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_country } from './models/mm';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://localhost:8000/mm';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<MM_country[]> {
    return this.http.get<MM_country[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
