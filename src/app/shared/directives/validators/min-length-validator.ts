import { AbstractControl } from "@angular/forms";

// custom validator to check that two fields match
export function MinLengthValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value < 1) {
        return { 'minLength': true };
      }
      return null;
}
