import { ChangeDetectorRef, Inject, Injectable, Optional } from '@angular/core';
import {
  MatPaginator,
  MatPaginatorDefaultOptions,
  MatPaginatorIntl,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
} from '@angular/material/paginator';

/**
 * This is an extension of the mat paginator component's
 * The main purpose for this seperation is to leave the ui implementation of the paginator
 * module loosely coupled and in the user's hand rather than forcing the rigid material implementation
 */
@Injectable({
  providedIn: null,
})
export class AppPaginator extends MatPaginator {
  constructor(
    intl: MatPaginatorIntl,
    changeDetectorRef: ChangeDetectorRef,
    @Optional()
    @Inject(MAT_PAGINATOR_DEFAULT_OPTIONS)
    private defaults?: MatPaginatorDefaultOptions
  ) {
    super(intl, changeDetectorRef, defaults);
  }

  set pageIndex(newPageIndex: number) {
    const prev = this.pageIndex;
    const total = this.getNumberOfPages();
    let index = Math.min(total - 1, newPageIndex);
    super.pageIndex = Math.max(0, index);

    this.page.emit({
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.length,
      previousPageIndex: prev,
    });
  }

  get pageIndex(): number {
    return super.pageIndex;
  }

  set pageSize(newSize: number) {
    super.pageSize = newSize;
    const total = this.getNumberOfPages();
    let index = Math.min(total - 1, this.pageIndex);
    index = Math.max(0, index);
    this.pageIndex = index;
  }

  reset() {
    super.pageSize = this.defaults?.pageSize ?? 50;
    this.pageIndex = 0;
  }

  get pageSize(): number {
    return super.pageSize;
  }

  set length(newLength: number) {
    super.length = newLength;
    this.pageIndex = this.pageIndex;
  }

  get length(): number {
    return super.length;
  }

  // calculates the natural number position of the provided item index
  calculateSn(index: number): number {
    return index + this.pageIndex * this.pageSize + 1;
  }
}
