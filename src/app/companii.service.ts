// src/app/services/country.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MM_sponsors } from './models/sponsors';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompaniiService {
  private apiUrl = environment.apiUrl + '/companii';

  constructor(private http: HttpClient) {}

  getSponsors(): Observable<MM_sponsors[]> {
    return this.http.get<MM_sponsors[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('Error fetching countries', error);
        return throwError(error);
      })
    );
  }
}
