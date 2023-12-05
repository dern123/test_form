import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../pages/auth/login/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private auth: LoginService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (this.auth.isLoggedIn()) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.auth.getToken()
                }
            })
        }

        return next.handle(req)
    }
}