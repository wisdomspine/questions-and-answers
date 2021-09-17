import {
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  ViewChildren,
} from '@angular/core';
import { SpreadsheetUtil } from '../../core/utils/spreadhseet.util';
import { SkipColumnExportDirective } from './skip-column-export.directive';

@Directive({
  selector: 'table[appExportTable]',
  exportAs: 'appExportTable',
})
/**
 * A directive to be applied to table elements that can be exported
 */
export class ExportTableDirective {
  @Input('appExportTable')
  filename!: string;

  @ContentChildren(SkipColumnExportDirective, { read: ElementRef })
  columnsToSkip: ElementRef[] = [];

  private spreadSheetUtil: SpreadsheetUtil = new SpreadsheetUtil();

  constructor(private el: ElementRef) {}

  export() {
    let table = this.el.nativeElement as HTMLTableElement;

    let cols: { col: string; skip: boolean }[] = [];

    table.querySelectorAll('thead th').forEach((th) => {
      cols.push({
        col: th.textContent ?? '',
        skip: this.columnsToSkip.map((col) => col.nativeElement).includes(th),
      });
    });
    let rows: { [key: string]: string }[] = [];
    table.querySelectorAll('tbody tr').forEach((tr) => {
      let row: { [key: string]: string } = {};
      (tr as HTMLTableRowElement)
        .querySelectorAll('td')
        .forEach((td, index) => {
          if (cols[index]?.skip) return;
          row[cols[index].col] = td.textContent ?? '';
        });
      rows.push(row);
    });

    const filename: string = this.filename ?? document.title;
    const wb = this.spreadSheetUtil.generatWorkBook({ data: rows });
    return this.spreadSheetUtil.downloadWorkBook(wb, `${filename}.xlsb`);
  }
}
