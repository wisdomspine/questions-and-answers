import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-labeled-form-field',
  templateUrl: './labeled-form-field.component.html',
  styleUrls: ['./labeled-form-field.component.scss'],
})
export class LabeledFormFieldComponent implements OnInit {
  @Input()
  control!: FormControl | undefined;

  @Input()
  labelId!: string;

  @Input()
  required: boolean = false;

  @Input()
  inputRef!: Element;

  constructor() {}

  ngOnInit(): void {}

  get labelClass(): string {
    if (this.control?.disabled) return 'app-contrast-text-color-primary-500-40';
    else if (this.control?.invalid && this.control.touched)
      return 'app-text-color-warn-500-90';
    // else if (this.inputRef && document.activeElement === this.inputRef)
    //   return 'app-text-color-accent-500-70';
    else return 'app-contrast-text-color-primary-500-60';
  }
}
