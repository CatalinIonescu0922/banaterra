// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_people } from './models/people';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private apiUrl = 'http://localhost:8000/people';

  constructor(private http: HttpClient) {}

  getPeoples(): Observable<MM_people[]> {
    return this.http.get<MM_people[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
