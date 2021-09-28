import { AppModel } from '../core/models/app-model';

export class Answer extends AppModel<Answer> {
  label!: string;
  answer!: string;
  isCorrect!: boolean;
}
