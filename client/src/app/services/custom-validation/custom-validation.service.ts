import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationService {

  constructor() { }

  MatchPassword(password: string, rePassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const rePasswordControl = formGroup.controls[rePassword];

      if (!passwordControl || !rePasswordControl) {
        return null
      }

      if (rePasswordControl.errors && !rePasswordControl.errors['passwordMismatch']) {
        return null
      }

      if (passwordControl.value !== rePasswordControl.value) {
        rePasswordControl.setErrors({passwordMismatch: true});
      }else {
        rePasswordControl.setErrors(null);

      }

      return null;
    }
  }
}
