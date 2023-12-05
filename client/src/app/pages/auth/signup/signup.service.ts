import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  private URL = "api/auth/"

  signup(login: string, email: string, name: string, gender:string, telegram: string, password: string ){
    return this.http.post<{data: any, status: boolean}>(this.URL + "signup", {
      login,
      email,
      name,
      gender,
      telegram,
      password
    });
  }
}
