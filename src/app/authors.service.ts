import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError, tap } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Author } from './models/author';  // Adjust the path as necessary
import { HtmlEntities } from './models/HtmlEntities';


@Injectable({
 providedIn: 'root',
})
export class AuthorsService {
 private baseUrl = 'http://localhost:8000/authors';

 constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}


 getAuthors(): Observable<Author[]> {
  return this.http.get<Author[]>(this.baseUrl).pipe(
      map(authors => authors.map(author => {
          author.des = decodeURIComponent(author.des);
          author.des = this.decodeHTML(author.des);  // Decode HTML entities
          return author;
      }))
  );
}

getQuoteCountsByLanguage(authorId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${authorId}/quotes/count`);
  }
  
getAuthorDetails(authorId: string, languageId: String): Observable<Author> {
    const url = `${this.baseUrl}/details/${authorId}/${languageId}`;  // Include languageId în URL
    console.log("Fetching details from URL:", url);
    return this.http.get<Author>(url).pipe(
        catchError(error => {
            console.error('Error fetching author details:', error);
            return throwError(() => new Error('Error fetching author details'));
        })
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
