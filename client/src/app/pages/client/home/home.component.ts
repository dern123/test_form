import { LoginService } from '../../../pages/auth/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private loginService:LoginService)  {}
  public user_login: boolean = false;
  ngOnInit(): void {
    if(!!this.loginService.getToken()) {
      this.user_login = true;
    }
  }
}
