import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppMediaService } from './app-media.service';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(
    private snackbar: MatSnackBar,
    private mediaService: AppMediaService
  ) {}

  open(args: {
    message: string;
    action?: string;
    config?: MatSnackBarConfig;
    color?: 'warn' | 'accent' | 'primary';
    sucess?: boolean;
  }) {
    const defPosition = this.defaultPosition;
    return this.snackbar.open(args.message, args?.action, {
      announcementMessage: args?.config?.announcementMessage,
      panelClass: [
        args?.color || 'accent',
        ...(args?.sucess ? ['app-active-background-color-important'] : []),
      ],
      duration: args?.config?.duration || 3500,
      horizontalPosition:
        args?.config?.horizontalPosition || defPosition.horizontalPosition,
      verticalPosition:
        args?.config?.verticalPosition || defPosition.verticalPosition,
    });
  }

  get defaultPosition(): MatSnackBarConfig<any> {
    if (this.mediaService.isHandset)
      return { horizontalPosition: 'center', verticalPosition: 'bottom' };
    else if (this.mediaService.isTablet)
      return { horizontalPosition: 'center', verticalPosition: 'top' };
    else
      return {
        horizontalPosition: 'right',
        verticalPosition: 'top',
      };
  }
}
