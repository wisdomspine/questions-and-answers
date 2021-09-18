import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { EMPTY, from, Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AppException } from '../core/models/exceptions/app-exception';
import { DialogService } from '../directives/dialog/dialog.service';
import { DatabaseService } from '../services/database.service';

@Injectable({
  providedIn: 'root',
})
export class DatabaseResolver implements Resolve<IDBDatabase> {
  constructor(
    private readonly datbaseService: DatabaseService,
    private readonly dialogService: DialogService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IDBDatabase> | Observable<never> {
    return this.datbaseService.db.pipe(
      catchError((error) => {
        return from(
          this.dialogService.confirm({
            title: 'Error loading database',
            subtitle:
              (error as AppException)?.message ??
              'Database not loaded, try again',
          })
        ).pipe(
          switchMap((reload) => {
            if (reload) return this.resolve(route, state);
            return EMPTY;
          })
        );
      })
    );
  }
}
