import { AbstractControl, ValidationErrors } from "@angular/forms"

export const usernameValidator = function (control: AbstractControl): ValidationErrors | null {

  let value: string = control.value || '';
  let msg = "";
  if (!value) {
    return null
  }

  if (value.indexOf(' ') >= 0) {
    return {
        removeSpaceFromUserName: true
    }
  }else {
    return null;
  }

}
