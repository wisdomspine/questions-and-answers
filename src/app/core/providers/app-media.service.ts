import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform } from '@angular/cdk/platform';
import { ScreenType } from '../enums/screen-type.enum';

@Injectable({
  providedIn: 'root',
})

/**
 * Responsible for providing media(screen, orientation, etc) update
 */
export class AppMediaService {
  private screenTypeSubect: BehaviorSubject<ScreenType> =
    new BehaviorSubject<ScreenType>(this.getScreenType());

  constructor(
    private breakpointObserver: BreakpointObserver,
    private platform: Platform
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Medium,
      ])
      .subscribe((state) => {
        this.screenTypeSubect.next(this.getScreenType());
      });
  }

  getScreenType(): ScreenType {
    if (this.breakpointObserver.isMatched(Breakpoints.XSmall)) {
      return ScreenType.Handset;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      return ScreenType.Tablet;
    } else {
      // I assume the device is a handset
      return ScreenType.Web;
    }
  }
  get onScreenTypeChanges(): Observable<ScreenType> {
    return this.screenTypeSubect;
  }

  get isHandset(): boolean {
    return this.getScreenType() === ScreenType.Handset;
  }

  get isTablet(): boolean {
    return this.getScreenType() === ScreenType.Tablet;
  }
  get isWeb(): boolean {
    return this.getScreenType() === ScreenType.Web;
  }

  get screenWidth(): number {
    return window.screen.width;
  }

  get viewportWidth(): number {
    return window.visualViewport.width;
  }

  get isTouchDevice(): boolean {
    return this.platform.IOS || this.platform.ANDROID;
  }
}
