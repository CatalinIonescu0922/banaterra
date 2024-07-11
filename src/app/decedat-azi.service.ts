// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_decedatAzi } from './models/decedatAzi';

@Injectable({
  providedIn: 'root'
})
export class DecedatAziService {
  private apiUrl = 'http://localhost:8000/decedat_azi';

  constructor(private http: HttpClient) {}

  getDecedatAzi(): Observable<MM_decedatAzi[]> {
    return this.http.get<MM_decedatAzi[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
