import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../pages/auth/login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }
  public user_login: boolean = false;
  public open: boolean = false;
  
  openMenu(){
    this.open = !this.open;
  }
  
  return(){
    this.router.navigate(['../client']);
  }

  ngOnInit(): void {
    if(!!this.loginService.getToken()) {
      this.user_login = true;
    }
  }

}
