import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { ExportTableDirective } from './export-table.directive';
import { SkipColumnExportDirective } from './skip-column-export.directive';
import { ExportTableTriggerDirective } from './export-table-trigger.directive';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    TableComponent,
    ExportTableDirective,
    SkipColumnExportDirective,
    ExportTableTriggerDirective,
  ],
  imports: [CommonModule, FlexLayoutModule],
  exports: [
    TableComponent,
    ExportTableDirective,
    SkipColumnExportDirective,
    ExportTableTriggerDirective,
  ],
})
export class TableModule {}
