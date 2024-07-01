// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_plants } from './models/plants';

@Injectable({
  providedIn: 'root'
})
export class PlantsService {
  private apiUrl = 'http://localhost:8000/plants';

  constructor(private http: HttpClient) {}

  getPlants(): Observable<MM_plants[]> {
    return this.http.get<MM_plants[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
