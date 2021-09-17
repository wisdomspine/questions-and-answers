import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RecordsInterval } from 'src/app/core/enums/records-interval.enum';

@Component({
  selector: 'app-records-interval-picker',
  templateUrl: './records-interval-picker.component.html',
  styleUrls: ['./records-interval-picker.component.scss'],
})
export class RecordsIntervalPickerComponent implements OnInit {
  @Output()
  intervalChange: EventEmitter<RecordsInterval> = new EventEmitter<RecordsInterval>();
  constructor() {}

  ngOnInit(): void {}

  intervals: RecordsInterval[] = Object.values(RecordsInterval);
  intervalText(interval: RecordsInterval): string {
    switch (interval) {
      case RecordsInterval.ANNUALLY:
        return 'This year';
      case RecordsInterval.MONTHLY:
        return 'This month';
      case RecordsInterval.WEEKLY:
        return 'This week';
    }
    return 'undefined';
  }
}
