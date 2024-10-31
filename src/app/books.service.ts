import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './models/book';
import { Language } from './models/language';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'http://localhost:8000/books'; // Replace with your backend URL

  constructor(private http: HttpClient) {}

  // Fetch list of languages
  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${this.apiUrl}`);
  }

  // Fetch original books by language
  getOriginalBooksByLanguage(languageId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/original/${languageId}`);
  }

  // Fetch translated books by language
  getTranslatedBooksByLanguage(languageId: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/translated/${languageId}`);
  }

  // Fetch book details by ID
  getBookById(bookId: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/${bookId}`);
  }
}
