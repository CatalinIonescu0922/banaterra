import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookdetailsService {
  private apiUrl = 'http://localhost:8000/books/details';

  constructor(private http: HttpClient) {}

  getAllQuotes(bookId: string): Observable<string[]> {
    return this.http.get<{ quote: string }[]>(`${this.apiUrl}/${bookId}`).pipe(
      map(response => response.map(item => item.quote)), // Directly mapping the response to extract quotes
      catchError(error => {
        console.error("Error fetching quotes:", error);
        return of([]); // Return an empty array in case of an error
      })
    );
  }
}
