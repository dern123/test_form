import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  private isAuthenticated = false;
  private isToken = null;

  setIsAuth() {
    return !this.isAuthenticated;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  setToken(token: any) {
    this.isToken = token;
  }

  getToken() {
    return localStorage.getItem('auth-token')
  }

  isLoggedIn() {
    return !!this.getToken()
  }

  logout() {
    this.isToken = null;
    localStorage.removeItem('auth-token')
    // localStorage.clear()
    sessionStorage.clear()
    this.router.navigate(['auth/login'])
  }

  login(login: string, password: string): Observable<any> {
    return this.http.post('api/auth/login', {
      login,
      password,
    }, httpOptions)
      .pipe(
        tap(
          (data: any) => {
            if (data.data.token) {
              localStorage.setItem('auth-token', data.data.token)
              this.setToken(data.data.token)
              // this.setUserInfo(data.data.userInfo)
            }
          }
        )
      )
  }
}
