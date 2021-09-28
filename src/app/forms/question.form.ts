import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '../core/validators';
import { Answer } from '../models/answer.model';
import { Question } from '../models/question.model';
import { AnswerForm } from './answer.form';

export class QuestionForm extends FormGroup {
  constructor(public readonly existingQuestion?: Question) {
    super({
      question: new FormControl(existingQuestion?.question, {
        validators: [Validators.required, AppValidators.notEmpty],
      }),
      answers: new FormArray(
        (existingQuestion?.answers ?? []).map(
          (answer, index) =>
            new AnswerForm(
              new Answer({
                ...answer,
                label: String.fromCharCode(index + 65),
              })
            )
        )
      ),
    });

    while (this.answers.controls.length < QuestionForm.minOptions) {
      this.addOption();
    }
  }

  get question(): FormControl {
    return this.controls['question'] as FormControl;
  }

  get answers(): FormArray {
    return this.controls['answers'] as FormArray;
  }

  get answersControls(): AnswerForm[] {
    return this.answers.controls as AnswerForm[];
  }

  removeOptionAtIndex(index: number) {
    if (!this.canRemoveOption) return;
    this.answers.removeAt(index);
    // update label
    (this.answers.controls as AnswerForm[]).forEach((control, index) => {
      control.label.setValue(String.fromCharCode(index + 65));
    });
  }

  addOption() {
    if (!this.canAddOption) return;
    this.answers.push(
      new AnswerForm(
        new Answer({
          label: String.fromCharCode(this.answers.controls.length + 65),
        })
      )
    );
  }

  setCorrectAnswer(correctAnswerIndex: number) {
    (this.answers.controls as AnswerForm[]).forEach((control, index) => {
      if (index == correctAnswerIndex) {
        control.isCorrect?.setValue(true);
      } else {
        control.isCorrect?.setValue(false);
      }
    });
  }

  get asModel(): Question {
    return new Question({
      question: this.question.value,
      answers: (this.answers.controls as AnswerForm[]).map(
        (form) => form.model
      ),
    });
  }

  get canAddOption(): boolean {
    return this.answers.controls.length < QuestionForm.maxOptions;
  }

  get canRemoveOption(): boolean {
    return this.answers.controls.length > QuestionForm.minOptions;
  }

  static readonly maxOptions: number = 26;
  static readonly minOptions: number = 2;
}
