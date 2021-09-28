import { AppModel } from '../core/models/app-model';
import { Answer } from './answer.model';

export class Question extends AppModel<Question> {
  id!: number;
  question!: string;
  order!: number;
  sheetId!: number;
  answers!: Answer[];
  get correctAnswer(): Answer | undefined {
    return (this.answers ?? []).find((answer) => answer.isCorrect);
  }
}
