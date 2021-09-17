import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root',
})
export class MetaService {
  private _defaultTitle: string = 'Zabira';
  private _titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(
    this._defaultTitle
  );

  constructor(titleService: Title) {
    this.title.subscribe((newTitle) => {
      titleService.setTitle(newTitle);
    });
  }

  get title(): Observable<string> {
    return this._titleSubject;
  }

  setTitle(newTitle: string | any) {
    this._titleSubject.next(newTitle?.trim() || this._defaultTitle);
  }
}
