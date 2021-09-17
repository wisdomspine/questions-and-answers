import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  get(key: string): string {
    return window.localStorage.getItem(key) as any;
  }
  set(key: string, value: string) {
    if (value == undefined) {
      this.remove(key);
    } else {
      window.localStorage.setItem(key, value);
    }
  }

  remove(key: string) {
    window.localStorage.removeItem(key);
  }
}
