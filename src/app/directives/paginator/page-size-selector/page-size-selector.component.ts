import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { AppPaginator } from '../models/app-paginator';

@Component({
  selector: 'app-page-size-selector',
  templateUrl: './page-size-selector.component.html',
  styleUrls: ['./page-size-selector.component.scss'],
})
export class PageSizeSelectorComponent implements OnInit, OnDestroy {
  @Input()
  controller!: AppPaginator;

  @Input()
  label: string = 'Results';

  @Input()
  appearance!: MatFormFieldAppearance;

  @Input()
  color!: ThemePalette;
  constructor() {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}

  get pageSizeOptions(): number[] {
    let sizes = this.controller.pageSizeOptions;
    if (!sizes.includes(this.controller.pageSize)) {
      sizes = [...sizes, this.controller.pageSize];
      sizes.sort();
    }
    return sizes;
  }

  selectionChange(newPageSize: number) {
    this.controller.pageSize = newPageSize;
  }
}
