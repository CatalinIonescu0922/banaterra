import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class CreateAccountService {
  private base = environment.apiUrl;  // ex: http://localhost:8000

  constructor(private http: HttpClient) {}

  createAccount(
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Observable<any> {
    return this.http.post(
      `${this.base}/login/createAccount`,
      { email, password, firstName, lastName },
      { withCredentials: true }
    );
  }
}
