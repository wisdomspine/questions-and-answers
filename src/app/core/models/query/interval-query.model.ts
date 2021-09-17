import { RecordsInterval } from '../../enums/records-interval.enum';
import { AppModel } from '../app-model';

export class IntervalQuery extends AppModel<IntervalQuery> {
  period!: RecordsInterval;
  from!: Date;
  to!: Date;
}
