import { Component, Inject, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  ngOnInit(): void {}

  get color(): ThemePalette {
    return this?.data?.color ?? 'accent';
  }
}

export interface ConfirmDialogData {
  color?: ThemePalette;
  cancelText?: string;
  acceptText?: string;
  iconColor?: string;
  fontIcon?: string | null;
  title: string;
  subtitle: string;
  iconTheme?: ThemePalette;
  acceptButtonTheme?: ThemePalette;
}
