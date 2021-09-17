import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FilterByDateTriggerComponent } from './filter-by-date-trigger/filter-by-date-trigger.component';
import { RecordsIntervalPickerComponent } from './records-interval-picker/records-interval-picker.component';

@NgModule({
  declarations: [FilterByDateTriggerComponent, RecordsIntervalPickerComponent],
  exports: [FilterByDateTriggerComponent, RecordsIntervalPickerComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
  ],
})
export class FilterModule {}
