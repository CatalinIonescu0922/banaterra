// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_nascutAzi } from './models/nascutAzi';

@Injectable({
  providedIn: 'root'
})
export class NascutAziService {
  private apiUrl = 'http://localhost:8000/nascut_azi';

  constructor(private http: HttpClient) {}

  getNascutAzi(): Observable<MM_nascutAzi[]> {
    return this.http.get<MM_nascutAzi[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
