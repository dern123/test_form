import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) { }
  private URL = "api/auth/"

  signup(data:any){
    return this.http.post<{data: any, status: boolean}>(this.URL + "signup", {...data});
  }
}
