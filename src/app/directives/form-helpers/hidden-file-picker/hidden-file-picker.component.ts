import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { FileUtil } from '../../../core/utils/file.util';

@Component({
  selector: 'app-hidden-file-picker',
  templateUrl: './hidden-file-picker.component.html',
  styleUrls: ['./hidden-file-picker.component.scss'],
})
export class HiddenFilePickerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private fileChangeSubscription!: Subscription;

  @Output()
  base64: EventEmitter<string | ArrayBuffer> = new EventEmitter<
    string | ArrayBuffer
  >();

  @Output('file')
  fileChange: EventEmitter<File> = new EventEmitter<File>();

  @Input()
  accept: string = '*/*';

  @ViewChild('file')
  file!: ElementRef;

  @ViewChild('fileForm')
  fileForm!: ElementRef;

  constructor() {}
  ngOnDestroy(): void {
    this.fileChangeSubscription?.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.fileChangeSubscription = fromEvent(
      this.file.nativeElement as HTMLInputElement,
      'change'
    ).subscribe((event) => {
      const file = (event.target as HTMLInputElement).files?.item(0);
      if (file) {
        this.fileChange.emit(file);
        this.updateBase64(file);
      }
    });
  }

  updateBase64(file: File) {
    FileUtil.fileToBase64(file)
      .then((res) => {
        if (res) {
          // console.log(res);
          this.base64.emit(res);
        }
      })
      .catch(console.error)
      .finally(() => {
        this.reset();
      });
  }

  ngOnInit(): void {}

  click() {
    const input = this.file?.nativeElement as HTMLInputElement;
    if (!input) return;
    input.click();
  }
  reset() {
    (this.fileForm.nativeElement as HTMLFormElement)?.reset();
  }
}
