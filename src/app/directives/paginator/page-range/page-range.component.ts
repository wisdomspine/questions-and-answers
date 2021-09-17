import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { AppPaginator } from '../models/app-paginator';

@Component({
  selector: 'app-paginator-range',
  templateUrl: './page-range.component.html',
  styleUrls: ['./page-range.component.scss'],
})
export class PageRangeComponent implements OnInit, OnDestroy {
  private controllerSubscription!: Subscription;
  @Input()
  controller!: AppPaginator;

  @Input()
  textColor!: ThemePalette;
  constructor() {}
  ngOnDestroy(): void {
    this.controllerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.calculateRangeText();
    this.controllerSubscription = this.controller.page.subscribe((pe) => {
      this.calculateRangeText();
    });
  }

  rangeText: string = 'Showing 0';

  private calculateRangeText() {
    let length = this.controller.length;
    if (length === 0) {
      this.rangeText = 'Showing 0';
      return;
    }
    let start = this.controller.pageIndex * this.controller.pageSize;
    let end = start + this.controller.pageSize;
    if (length != null) {
      end = Math.min(end, length);
    }
    this.rangeText = `Showing ${start + 1} to ${end} of ${length ?? 'Many'}`;
  }
}
