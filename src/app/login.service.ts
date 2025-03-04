import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable , BehaviorSubject } from 'rxjs';
import {tap} from 'rxjs/operators'
import { environment } from '../environments/environment';
import { Console } from 'console';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor( private http : HttpClient) { }

  login(email : string , password : string ): Observable<any>{
     return this.http.post(`${environment.apiUrl}/login` , {email , password} , {withCredentials : true}).pipe(
      tap( ()=>{
         console.log("login complete ");
         
      } )
     )
  }
}
