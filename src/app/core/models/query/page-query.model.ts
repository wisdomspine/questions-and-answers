import { changeCaseTo } from '../../../directives/pipes/change-case.pipe';
import { AppModel } from '../app-model';
import { QueryOrder } from './query-order.enum';

export class PageQuery<T extends PageQuery<any> = any> extends AppModel<T> {
  perPage!: number;
  page!: number;
  sortOrder!: QueryOrder;
  sortBy!: string;
  s!: string;

  get httpBody(): any {
    let res = { ...this };
    if (res.sortBy) {
      res = { ...res, sortBy: changeCaseTo(res.sortBy, 'snake') };
    }
    if (this.page != null) {
      // I'm increasing the page to natural number because the zabira platform starts counting a page from 1
      res = { ...res, page: this.page + 1 };
    }
    if (this.sortOrder) {
      res = { ...res, sortOrder: this.sortOrder.toLowerCase() };
    }

    for (const key in res) {
      if (Object.prototype.hasOwnProperty.call(res, key)) {
        if (typeof res[key] == 'string') {
          if ((res[key] as any as string).trim() == '') {
            res[key] = undefined as any;
          }
        }

        if (res[key] == undefined) {
          delete res[key];
        }
      }
    }

    return res;
  }
}
