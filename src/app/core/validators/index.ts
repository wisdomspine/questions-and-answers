import {
  AbstractControl,
  AsyncValidatorFn,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';
import { passwordStrength } from 'check-password-strength';
import { isPossiblePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';

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

  static passwordStrength: ValidatorFn = (control: AbstractControl) => {
    const value: string = (control?.value as string)?.trim();
    if (value == null || value == '') return null;
    const validation = passwordStrength(value);
    let error = null;
    if (validation.length < 8)
      error = {
        passwordStrength: 'Password should contain atleast 8 characters',
      };
    else if (!validation.contains.includes('lowercase'))
      error = {
        passwordStrength: 'Password should contain lower case character',
      };
    else if (!validation.contains.includes('uppercase'))
      error = {
        passwordStrength: 'Password should contain upper case character',
      };
    else if (!validation.contains.includes('number'))
      error = { passwordStrength: 'Password should contain atleast a number' };
    else if (!validation.contains.includes('symbol'))
      error = {
        passwordStrength: 'Password should contain atleast a symbol (@, _, !)',
      };

    return error;
  };

  static internationalPhone: ValidatorFn = (control: AbstractControl) => {
    const value: string = (control?.value as string)?.trim();
    if (value == null || value == '') return null;
    const validation = passwordStrength(value);
    let error = null;
    if (!isValidInternationalPhone(value)) {
      error = { internationalPhone: true };
    }
    return error;
  };

  static maxPasswordLength: number = 14;

  //   static validateNigeriaPhoneNumber: AsyncValidatorFn = async (
  //     control: AbstractControl
  //   ) => {
  //     const value: string = (control?.value as string)?.trim();
  //     if (value == null || value == '') return null;
  //     try {
  //       let status = await validatePhoneNumberSync(value);
  //       if (status.isValid) return null;
  //       return { validateNigeriaPhoneNumber: true };
  //     } catch (error) {
  //       return null;
  //     }
  //   };
}

export function isValidInternationalPhone(phone: string) {
  return isValidPhoneNumber(phone);
}
