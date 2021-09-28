import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../core/validators';
import { Answer } from '../models/answer.model';

export class AnswerForm extends FormGroup {
  constructor(answer?: Answer) {
    super({
      label: new FormControl(answer?.label, {
        validators: [Validators.required, AppValidators.notEmpty],
      }),
      answer: new FormControl(answer?.answer, {
        validators: [Validators.required, AppValidators.notEmpty],
      }),
      isCorrect: new FormControl(answer?.isCorrect),
    });
  }

  get label(): FormControl {
    return this.controls['label'] as FormControl;
  }

  get answer(): FormControl {
    return this.controls['answer'] as FormControl;
  }

  get isCorrect(): FormControl {
    return this.controls['isCorrect'] as FormControl;
  }

  get model(): Answer {
    return new Answer(this.value);
  }
}
