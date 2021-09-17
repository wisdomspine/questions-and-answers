import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatPaginatorModule,
  MAT_PAGINATOR_DEFAULT_OPTIONS,
} from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { PageLinksComponent } from './page-links/page-links.component';
import { PageSizeSelectorComponent } from './page-size-selector/page-size-selector.component';
import { PageRangeComponent } from './page-range/page-range.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    PageLinksComponent,
    PageSizeSelectorComponent,
    PageRangeComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatSelectModule,
  ],

  providers: [
    {
      provide: MAT_PAGINATOR_DEFAULT_OPTIONS,
      useValue: {
        pageSize: 10,
        pageSizeOptions: [5, 10, 15, 25, 50, 75, 100],
      },
    },
  ],
  exports: [PageLinksComponent, PageSizeSelectorComponent, PageRangeComponent],
})
export class PaginatorModule {}
