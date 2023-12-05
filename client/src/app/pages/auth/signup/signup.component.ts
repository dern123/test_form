import { SignupService } from './signup.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms"
import { CustomValidators } from '../../../components/providers/CustomValidators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private signupService: SignupService) {

  }

  public formRegistration: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      login: new FormControl('', [Validators.required, Validators.pattern(/^[^<>\!@#$%^&*()_](\S*\s){0,0}\S*$/), Validators.pattern(/.[A-Za-z0-9]{2}$/)]),
      name: new FormControl('', [Validators.required]),
      gender: new FormControl('man', [Validators.required]),
      telegram: new FormControl('', [Validators.required, Validators.pattern(/^[^<>\!#$%^&*()_](\S*\s){0,0}\S*$/), Validators.pattern(/.[A-Za-z0-9]$/)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),
      passwordRepeat: new FormControl('', [Validators.required,  Validators.minLength(8), Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
    },
    {
      validators: CustomValidators
      // validator: CustomValidators("password", "passwordRepeat")
    }
  )

  submit(){
    console.log("🚀 ~ file: signup.component.ts:35 ~ SignupComponent ~ submit ~ this.formRegistration:", this.formRegistration)

      this.signupService.signup(this.formRegistration.value)
      .subscribe((data: any)=> {
        console.log("🚀 ~ file: signup.component.ts:38 ~ SignupComponent ~ .subscribe ~ data:", data)
      })
  }

  ngOnInit(): void {
  }
  
}
