import { AppModel } from '../core/models/app-model';
import { Question } from './question.model';

export class Sheet extends AppModel<Sheet> {
  id!: number;
  title!: string;
  questions!: Question[];
}
