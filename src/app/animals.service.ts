// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_animals } from './models/animals';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AnimalsService {
  private apiUrl = environment.apiUrl + '/animals';

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
