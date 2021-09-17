import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExportButtonComponent } from './export-button/export-button.component';
import { MatButtonModule } from '@angular/material/button';
import { ResetButtonComponent } from './reset-button/reset-button.component';
import { SearchButtonComponent } from './search-button/search-button.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ExportButtonComponent,
    ResetButtonComponent,
    SearchButtonComponent,
  ],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  exports: [ExportButtonComponent, ResetButtonComponent, SearchButtonComponent],
})
export class ButtonModule {}
