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
  public signupSuccess: boolean = false;
  public signupError: boolean = false;
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
  get f() {
    return this.formRegistration.controls;
  }
  submit(){
    const { login, email, name, gender, telegram, password } = this.f;
      this.signupService.signup(login.value, email.value, name.value, gender.value, telegram.value, password.value)
      .subscribe((data: any) => {
          if (data.status) {
            console.log("🚀 ~ file: signup.component.ts:38 ~ SignupComponent ~ .subscribe ~ data:", data)

            this.signupSuccess = !this.signupSuccess;
          }
          else{
            this.signupError = !this.signupError;
          }
        }
      //   {
      //   next: data => {
      //   console.log("🚀 ~ file: signup.component.ts:38 ~ SignupComponent ~ .subscribe ~ data:", data)
      //     if (data.status == true) {
      //       this.signupSuccess = !this.signupSuccess;
      //     }
      //     else{
      //       this.signupError = !this.signupError;
      //     }
      //   },
      //   error: data => {
      //     console.log("🚀 ~ file: signup.component.ts:50 ~ SignupComponent ~ submit ~ data:", data)
      //   }
      // }
      );
  }

  ngOnInit(): void {
  }
  
}
