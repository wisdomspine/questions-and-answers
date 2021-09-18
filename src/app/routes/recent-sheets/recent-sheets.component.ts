import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Subscription } from 'rxjs';
import {
  distinctUntilChanged,
  map,
  pairwise,
  throttleTime,
} from 'rxjs/operators';
import { AppException } from '../../core/models/exceptions/app-exception';
import { LoadingService } from '../../core/providers/loading.service';
import { SnackbarService } from '../../core/providers/snackbar.service';
import { SheetTitleComponent } from '../../dialogs/sheet-title/sheet-title.component';
import { DialogService } from '../../directives/dialog/dialog.service';
import { Sheet } from '../../models/sheet.model';
import { QuestionsAndAnswersService } from '../../services/questions-and-answers.service';
import { Endpoints } from '../endpoints';

@Component({
  selector: 'app-recent-sheets',
  templateUrl: './recent-sheets.component.html',
  styleUrls: ['./recent-sheets.component.scss'],
  animations: [
    trigger('scroll', [
      transition(':leave', [
        style({ opacity: 1, transform: 'translateY(0%)' }),
        animate(
          '0.3s 0s ease-out',
          style({ opacity: 0, transform: 'translateY(-100%)' })
        ),
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-100%)' }),
        animate(
          '0.3s 0s ease-out',
          style({ opacity: 1, transform: 'translateY(%)' })
        ),
      ]),
    ]),
  ],
})
export class RecentSheetsComponent implements OnInit, OnDestroy {
  scrollDown: boolean = false;
  kEndpoints = Endpoints;
  sheets: Sheet[] = [];

  searchControl: FormControl = new FormControl();

  private searchSubscription: Subscription =
    this.searchControl.valueChanges.subscribe((val) => {
      this.initSearch();
    });

  private sheetChangeSubscription!: Subscription;

  constructor(
    public readonly dialogService: DialogService,
    public readonly questionsService: QuestionsAndAnswersService,
    public readonly loadingService: LoadingService,
    public readonly snackbar: SnackbarService,
    private readonly matDialog: MatDialog
  ) {}
  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
    this.sheetChangeSubscription?.unsubscribe();
    this.searchSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.initSearch();
  }

  private initSearch() {
    this.sheetChangeSubscription?.unsubscribe();
    this.sheetChangeSubscription = this.questionsService
      .querySheetsChanges(this.searchControl.value)
      .subscribe((sheets) => {
        this.sheets = sheets ?? [];
      });
  }

  private scrollSubscription: Subscription = fromEvent(window, 'scroll')
    .pipe(
      throttleTime(10),
      map((event) => window.scrollY),
      pairwise(),
      map(([x1, x2]) => x2 - x1),
      map((down) => down >= 0),
      distinctUntilChanged()
    )
    .subscribe((down) => {
      this.scrollDown = down;
    });

  deleteSheet(sheetId: number) {
    this.dialogService
      .confirm({
        acceptText: 'Delete',
        cancelText: 'Cancel',
        title: 'Delete Questions',
        subtitle:
          'Please confirm you want to delete all the questions and answers in this sheet',
        acceptButtonTheme: 'warn',
        iconTheme: 'warn',
      })
      .then((ans) => {
        if (ans) {
          this.loadingService.start();
          this.questionsService.deleteSheet(sheetId).subscribe(
            (success) => {
              this.snackbar.open({
                message: 'Question Sheet deleted',
                color: 'accent',
                sucess: true,
              });
              this.loadingService.stop();
            },
            (error) => {
              this.loadingService.stop();
              if (error instanceof AppException) {
                this.snackbar.open({
                  message: error?.message || 'Error deleting Sheet',
                  color: 'warn',
                });
              }
            }
          );
        }
      });
  }

  createSheet() {
    this.matDialog
      .open(SheetTitleComponent, {
        maxHeight: '95vh',
        maxWidth: '80vw',
        width: '540px',
      })
      .afterClosed()
      .toPromise()
      .then((e) => {
        // create a new sheet and navigate
      });
  }
}
