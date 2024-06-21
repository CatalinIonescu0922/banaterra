import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../iauthors';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthorsService {
  private baseUrl = 'http://localhost:8000/authors';

  constructor(private http: HttpClient) {}

  getAuthorByTagId(tagId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tagId}`);
  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl).pipe(
      map((authors) =>
        authors.map((author) => {
          author.des = this.decodeHTML(decodeURIComponent(author.des));
          return author;
        })
      )
    );
  }

  private decodeHTML(html: string): string {
    if (typeof document !== 'undefined') {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    } else {
      // Fallback for non-browser environments
      return html
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    }
  }
}
