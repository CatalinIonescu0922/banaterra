import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Book } from './models/book';  // Adjust the path as necessary
import { HtmlEntities } from './models/HtmlEntities';


@Injectable({
 providedIn: 'root',
})
export class BooksService {
 private baseUrl = 'http://localhost:8000/book';

 constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}


 getBooks(): Observable<Book[]> {
  return this.http.get<Book[]>(this.baseUrl).pipe(
      map(books => books.map(book => {
          return book;
      }))
  );
}



/*
  // În authors.service.ts, actualizează metoda care face interogarea pentru a include limba
// În authors.service.ts
getAuthorDetails(authorId: number, languageId: String): Observable<Author> {
    const url = `${this.baseUrl}/detail/${authorId}/${languageId}`;  // Include languageId în URL
    console.log("Fetching details from URL:", url);
    return this.http.get<Author>(url).pipe(
        tap(author => console.log('Fetched author details:', author)),
        catchError(error => {
            console.error('Error fetching author details:', error);
            return throwError(() => new Error('Error fetching author details'));
        })
    );
  }
*/



  private decodeHTML(html: string): string {
    const htmlEntities: HtmlEntities = {
        "&lt;": "<",
        "&gt;": ">",
        "&amp;": "&",
        "&quot;": "\"",
        "&#39;": "'"
    };

    return html.replace(/&lt;|&gt;|&amp;|&quot;|&#39;/g, (match) => htmlEntities[match] || match);
}

}
