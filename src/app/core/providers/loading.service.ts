import { Injectable } from '@angular/core';
import {
  Event,
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../directives/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private isLoadingSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);
  constructor(
    private router: Router,
    private navigationService: NavigationService
  ) {
    this.initRouterHandler();
  }

  private initRouterHandler() {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationCancel ||
        event instanceof NavigationEnd ||
        event instanceof NavigationError
      ) {
        this?.stop();
      } else if (event instanceof NavigationStart) {
        this?.start();
      }
    });
  }

  get isLoadingChanges(): Observable<boolean> {
    return this.isLoadingSubject;
  }

  start() {
    this.navigationService.openLoadingDialog();
    this.isLoadingSubject.next(true);
  }

  stop() {
    this.navigationService.closeLoadingDialog();
    this.isLoadingSubject.next(false);
  }
}
