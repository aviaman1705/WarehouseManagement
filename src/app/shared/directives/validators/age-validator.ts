import { AbstractControl } from "@angular/forms";

// custom validator to check that two fields match
export function AgeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value > 18) {
        return { 'age': true };
      }
      return null;
}
