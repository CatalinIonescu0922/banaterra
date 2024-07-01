// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_bible } from './models/bible';

@Injectable({
  providedIn: 'root'
})
export class BibleService {
  private apiUrl = 'http://localhost:8000/bible';

  constructor(private http: HttpClient) {}

  getBible(): Observable<MM_bible[]> {
    return this.http.get<MM_bible[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
