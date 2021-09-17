import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LabeledFormFieldComponent } from './labeled-form-field/labeled-form-field.component';
import { LabelComponent } from './label/label.component';
import { ProgressButtonComponent } from './progress-button/progress-button.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HiddenFilePickerComponent } from './hidden-file-picker/hidden-file-picker.component';

@NgModule({
  declarations: [
    LabeledFormFieldComponent,
    LabelComponent,
    ProgressButtonComponent,
    HiddenFilePickerComponent,
  ],
  exports: [
    LabeledFormFieldComponent,
    LabelComponent,
    ProgressButtonComponent,
    HiddenFilePickerComponent,
  ],
  imports: [CommonModule, MatProgressSpinnerModule],
})
export class FormHelpersModule {}
