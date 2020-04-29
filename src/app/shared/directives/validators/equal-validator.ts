import { FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function EqualValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.equalValidator) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails

        let controlItem = control.value != "" ? new Date(control.value) : new Date();
        let matchingItem = matchingControl.value != "" ? new Date(matchingControl.value) :  new Date();

        if (controlItem >= matchingItem) {
            matchingControl.setErrors({ equalValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
