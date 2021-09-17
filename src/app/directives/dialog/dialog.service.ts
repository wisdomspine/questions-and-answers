import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from './confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirm(options?: ConfirmDialogData): Promise<boolean> {
    return this.dialog
      .open(ConfirmDialogComponent, {
        maxHeight: '80vh',
        maxWidth: '80vw',
        width: '600px',
        data: options,
      })
      .afterClosed()
      .toPromise()
      .then((e) => !!e);
  }
}
