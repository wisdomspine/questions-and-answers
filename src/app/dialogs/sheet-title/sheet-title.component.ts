import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppException } from '../../core/models/exceptions/app-exception';
import { LoadingService } from '../../core/providers/loading.service';
import { SnackbarService } from '../../core/providers/snackbar.service';
import { SheetTitleForm } from '../../forms/sheet-title.form';
import { Sheet } from '../../models/sheet.model';
import { Endpoints } from '../../routes/endpoints';
import { QuestionsAndAnswersService } from '../../services/questions-and-answers.service';

@Component({
  selector: 'app-create-country',
  templateUrl: './sheet-title.component.html',
  styleUrls: ['./sheet-title.component.scss'],
})
export class SheetTitleComponent implements OnInit {
  form: SheetTitleForm = new SheetTitleForm(this.data?.sheet);

  constructor(
    public readonly dialogRef: MatDialogRef<SheetTitleComponent>,
    private snackbar: SnackbarService,
    private loadingService: LoadingService,
    @Inject(MAT_DIALOG_DATA)
    public readonly data: SheetTitleComponentDialogData,
    public readonly questionsService: QuestionsAndAnswersService
  ) {}

  ngOnInit(): void {}

  done() {
    this.dialogRef?.close();
    this.loadingService.start();
    (this.data?.sheet?.id
      ? this.questionsService.updateSheet(
          this.data.sheet.id,
          new Sheet({ ...this.data.sheet, title: this.form.title?.value })
        )
      : this.questionsService.addSheet(
          new Sheet({ title: this.form.title?.value })
        )
    ).subscribe(
      (success) => {
        this.snackbar.open({
          message: 'Question Sheet added',
          color: 'accent',
          sucess: true,
        });
        this.dialogRef.close(success);
        try {
          this.loadingService.stop();
        } catch (error) {}
      },
      (error) => {
        this.loadingService.stop();
        if (error instanceof AppException) {
          this.snackbar.open({
            message: error?.message || 'Error Creating Sheet',
            color: 'warn',
          });
        }
      }
    );
  }
}

export interface SheetTitleComponentDialogData {
  sheet: Sheet;
}
