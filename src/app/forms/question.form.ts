import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../core/validators';
import { Question } from '../models/question.model';

export class QuestionForm extends FormGroup {
  constructor(public readonly existingQuestion?: Question) {
    super({
      question: new FormControl(existingQuestion?.question, {
        validators: [Validators.required, AppValidators.notEmpty],
      }),

      answer: new FormControl(existingQuestion?.answer),
    });
  }

  get question(): FormControl {
    return this.controls['question'] as FormControl;
  }

  get answer(): FormControl {
    return this.controls['answer'] as FormControl;
  }
}
