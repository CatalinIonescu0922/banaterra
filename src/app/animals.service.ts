// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_animals } from './models/animals';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private apiUrl = 'http://localhost:8000/animals';

  constructor(private http: HttpClient) {}

  getAnimals(): Observable<MM_animals[]> {
    return this.http.get<MM_animals[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
