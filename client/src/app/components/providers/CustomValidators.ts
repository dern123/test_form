import {
    AbstractControl
  } from '@angular/forms';
  
  export function CustomValidators(control: AbstractControl): { [key: string]: boolean} | null {
  const password = control.get('password');
  const passwordRepeat = control.get('passwordRepeat');

  if (password && passwordRepeat && password.value !== passwordRepeat.value) {
    return { 'passwordMismatch': true };
  }

  return null;
}  