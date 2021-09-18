import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../core/validators';
import { Sheet } from '../models/sheet.model';

export class SheetTitleForm extends FormGroup {
  constructor(form?: Sheet) {
    super({
      title: new FormControl(form?.title, {
        validators: [Validators.required, AppValidators.notEmpty],
      }),
    });
  }

  get title(): FormControl {
    return this.controls['title'] as FormControl;
  }
}
