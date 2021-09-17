import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

const DIALOG_ID: string = 'xemeknenkjfnkfdkdndndjndjndjdnjdddjdssss';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  constructor(private matDialog: MatDialog) {
    // setTimeout(() => {
    //   this.openLoadingDialog();
    // }, 30000);
  }

  openLoadingDialog() {
    this.closeLoadingDialog();
    this.matDialog.open<ProgressBarComponent>(ProgressBarComponent, {
      hasBackdrop: true,
      disableClose: true,
      id: DIALOG_ID,
      position: { top: '0px', left: '0px', right: '0px' },
      maxWidth: '100vw',
      minWidth: '100vw',
      panelClass: 'app-navigation-loading-dialog',
    });
  }

  closeLoadingDialog() {
    this.matDialog.getDialogById(DIALOG_ID)?.close();
  }
}
