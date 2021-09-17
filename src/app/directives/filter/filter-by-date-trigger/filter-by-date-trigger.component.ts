import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Observable, Subscription, zip } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-filter-by-date-trigger',
  templateUrl: './filter-by-date-trigger.component.html',
  styleUrls: ['./filter-by-date-trigger.component.scss'],
  animations: [
    trigger('dateAnimation', [
      transition(':enter', [
        style({ right: '-100%', opacity: '0' }),
        animate(
          '0.25s 0s ease-in',
          style({
            right: '0%',
            opacity: '1',
          })
        ),
      ]),
      transition(':leave', [
        style({ right: '0%', opacity: '1' }),
        animate(
          '0.25s 0s ease-in',
          style({
            right: '-100%',
            opacity: '0',
          })
        ),
      ]),
    ]),
  ],
})
export class FilterByDateTriggerComponent implements OnInit, OnDestroy {
  _pickerClass: string = `${Date.now()}-fil-by-dt-tg-cm`;
  _startControl: FormControl = new FormControl(new Date());
  _endControl: FormControl = new FormControl(new Date());
  dismissSubject: Observable<MouseEvent> = fromEvent<MouseEvent>(
    window,
    'click'
  ).pipe(
    filter((event) => event.type == 'click'),
    filter((event) => {
      let panelIndex = event
        .composedPath()
        .findIndex((target) =>
          (target as Element)?.classList?.contains(this._pickerClass)
        );
      panelIndex = panelIndex ?? -1;
      return panelIndex < 0;
    })
  );

  dismissSubscription!: Subscription;
  controlSubscription!: Subscription;

  @Input()
  set range(newRange: SelectedDateRange) {
    newRange = newRange ?? this.range;
    this._startControl = new FormControl(newRange?.start);
    this._endControl = new FormControl(newRange?.end);
    this.initControls();
  }

  get range(): SelectedDateRange {
    return new SelectedDateRange({
      start: this._startControl.value,
      end: this._endControl.value,
    });
  }

  @Input()
  minDate!: Date;

  @Input()
  maxDate!: Date;

  @Output()
  rangeChange: EventEmitter<SelectedDateRange> = new EventEmitter();

  showDate: boolean = false;
  constructor() {}

  private initControls() {
    this.destroyControls();
    // this._endControl.valueChanges.subscribe(console.log);
    // this.controlSubscription = zip(
    //   this._startControl.valueChanges,
    //   this._endControl.valueChanges
    // ).subscribe((event) => {
    //   console.log(event);
    //   this.rangeChange.emit(this.range);
    // });
  }

  private destroyControls() {
    this.controlSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.dismissSubscription = this.dismissSubject.subscribe((event) => {
      this.showDate = false;
    });
  }
  ngOnDestroy(): void {
    this.dismissSubscription?.unsubscribe();
  }

  emitEvent() {
    this.rangeChange.emit(this.range);
  }
}

export class SelectedDateRange {
  start!: Date;
  end!: Date;
  constructor(args?: Partial<SelectedDateRange>) {
    Object.assign(this, args ?? {});
  }
}
