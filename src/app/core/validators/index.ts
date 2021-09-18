import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';

export class AppValidators {
  static notEmpty: ValidatorFn = (control: AbstractControl) => {
    const value = control?.value;
    console.log(value);
    let isValid: boolean = true;
    isValid = value == null || (value as string).trim() != '';
    if (isValid) return null;
    return {
      notEmpty: true,
    };
  };

  static dependsOnSibling(
    siblingName: string,
    predicate: (control: AbstractControl, sibling: AbstractControl) => boolean
  ): ValidatorFn {
    return (control: AbstractControl) => {
      let isValid: boolean = true;
      let sibling = (control.parent as FormGroup)?.controls?.[siblingName];
      if (!sibling) return null;
      isValid = predicate(control, sibling);
      if (isValid) return null;
      return {
        dependsOnSibling: true,
      };
    };
  }
}
