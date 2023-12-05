import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  private URL = "/api/auth/"

  signup(login: string, email: string, name: string, gender:string, telegram: string, password: string ): Observable<any>{      
    return this.http.post<{data: any, status: boolean}>(
      this.URL + "signup", {
      // "http://localhost:5000/api/auth/signup",{
      login,
      email,
      name,
      gender,
      telegram,
      password
    }, httpOptions);
  }
}
