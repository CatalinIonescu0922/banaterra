import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  private baseUrl = 'http://localhost:3306/authors';
  constructor(private http : HttpClient) {

   }
   getAuthorByTagId(tagId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${tagId}`);
  }
}