import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Author } from './models/author';  // Adjust the path as necessary
import { HtmlEntities } from './models/HtmlEntities';


@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private baseUrl = 'http://localhost:8000/authors';

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  getAuthorByTagId(tagId: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${tagId}`);
  }

  getAuthors(): Observable<Author[]> {
  return this.http.get<Author[]>(this.baseUrl).pipe(
      map(authors => authors.map(author => {
          author.des = decodeURIComponent(author.des);
          author.des = this.decodeHTML(author.des);  // Decode HTML entities
          return author;
      }))
  );
}

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
