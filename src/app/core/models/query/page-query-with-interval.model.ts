import { RecordsInterval } from '../../enums/records-interval.enum';
import { PageQuery } from './page-query.model';

export class PageQueryWithInterval extends PageQuery<PageQueryWithInterval> {
    period!: RecordsInterval;
  from!: Date;
  to!: Date;
}
