import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSkipColumnExport]',
})
export class SkipColumnExportDirective {
  constructor() {}
}
