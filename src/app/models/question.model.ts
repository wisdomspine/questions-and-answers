import { AppModel } from '../core/models/app-model';

export class Question extends AppModel<Question> {
  id!: number;
  question!: string;
  answer!: string;
  order!: number;
  sheetId!: number;
}
