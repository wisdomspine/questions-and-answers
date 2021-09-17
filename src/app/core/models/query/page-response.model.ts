export class PagedResponse<T> {
  total!: number;
  perPage!: number;
  currentPage!: number;
  prevPage!: number;
  nextPage!: number;
  nextPageUrl!: string;
  prevPageUrl!: string;
  data!: T[];
  constructor(args: Partial<PagedResponse<T>>) {
    Object.assign(this, args);
  }
  static firstPage: number = 1;
}
