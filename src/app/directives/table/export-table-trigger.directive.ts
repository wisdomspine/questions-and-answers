import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
} from '@angular/core';
import { ExportTableDirective } from './export-table.directive';

@Directive({
  selector: '[appExportTableTrigger]',
})
export class ExportTableTriggerDirective {
  @Input('appExportTableTrigger')
  table!: ExportTableDirective;

  @HostListener('click')
  onClick() {
    this.table?.export();
  }

  constructor() {}
}
