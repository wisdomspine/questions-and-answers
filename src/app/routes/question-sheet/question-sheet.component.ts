import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, fromEvent } from 'rxjs';
import {
  throttleTime,
  map,
  pairwise,
  distinctUntilChanged,
} from 'rxjs/operators';
import { AppException } from '../../core/models/exceptions/app-exception';
import { LoadingService } from '../../core/providers/loading.service';
import { SnackbarService } from '../../core/providers/snackbar.service';
import {
  SheetTitleComponent,
  SheetTitleComponentDialogData,
} from '../../dialogs/sheet-title/sheet-title.component';
import { DialogService } from '../../directives/dialog/dialog.service';
import { QuestionForm } from '../../forms/question.form';
import { Question } from '../../models/question.model';
import { Sheet } from '../../models/sheet.model';
import { QuestionsAndAnswersService } from '../../services/questions-and-answers.service';
import { Endpoints } from '../endpoints';

@Component({
  selector: 'app-question-sheet',
  templateUrl: './question-sheet.component.html',
  styleUrls: ['./question-sheet.component.scss'],
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
export class QuestionSheetComponent implements OnInit, OnDestroy {
  scrollDown: boolean = false;
  kEndpoints = Endpoints;
  form: QuestionForm = new QuestionForm();
  sheetId!: number;
  questions: Question[] = [];
  sheet!: Sheet;
  private questionsSubscription!: Subscription;
  private sheetSubscription!: Subscription;

  constructor(
    public readonly dialogService: DialogService,
    private readonly matDialog: MatDialog,
    activatedRoute: ActivatedRoute,
    public readonly questionsService: QuestionsAndAnswersService,
    public readonly loadingService: LoadingService,
    public readonly snackbar: SnackbarService,
    public readonly router: Router
  ) {
    activatedRoute.paramMap.subscribe((params) => {
      this.sheetId = Number.parseInt(params.get('sheetId') ?? '');
      this.initSheet();
    });
  }

  initSheet() {
    this.questionsSubscription?.unsubscribe();
    this.questionsSubscription = this.questionsService
      .queryQuestionsChanges(this.sheetId)
      .subscribe((questions) => {
        this.questions = questions ?? [];
      });

    // subscribe to the sheet itself
    this.questionsSubscription = this.questionsService
      .querySheetChanges(this.sheetId)
      .subscribe((sheet) => {
        if (!sheet) this.router.navigate([Endpoints.recentSheetsUrl]);
        this.sheet = sheet as any;
      });
  }

  setEditingQuestion(question: Question) {
    this.form = new QuestionForm(question);
  }
  ngOnDestroy(): void {
    this.scrollSubscription?.unsubscribe();
  }

  ngOnInit(): void {}

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
      console.log(down);
      this.scrollDown = down;
    });

  deleteSheet() {
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

          this.questionsService.deleteSheet(this.sheetId).subscribe(
            (success) => {
              this.snackbar.open({
                message: 'Question Sheet deleted',
                color: 'accent',
                sucess: true,
              });
              this.loadingService.stop();
              this.router.navigate([Endpoints.recentSheetsUrl]);
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

  deleteQuestion(questionId: number) {
    this.dialogService
      .confirm({
        acceptText: 'Delete',
        cancelText: 'Cancel',
        title: 'Delete Question',
        subtitle:
          "Please confirm you want to delete this question and its' answer",
        acceptButtonTheme: 'warn',
        iconTheme: 'warn',
      })
      .then((ans) => {
        if (ans) {
          this.loadingService.start();

          this.questionsService.deleteQuestion(questionId).subscribe(
            (success) => {
              this.snackbar.open({
                message: 'Question deleted',
                color: 'accent',
                sucess: true,
              });
              this.loadingService.stop();
            },
            (error) => {
              this.loadingService.stop();
              if (error instanceof AppException) {
                this.snackbar.open({
                  message: error?.message || 'Error deleting question',
                  color: 'warn',
                });
              }
            }
          );
        }
      });
  }

  editSheetTitle() {
    this.matDialog
      .open<SheetTitleComponent, SheetTitleComponentDialogData>(
        SheetTitleComponent,
        {
          maxHeight: '95vh',
          maxWidth: '80vw',
          width: '540px',
          data: {
            sheet: this.sheet,
          },
        }
      )
      .afterClosed()
      .toPromise()
      .then((e) => {});
  }

  createQuestion() {
    this.loadingService.start();
    this.questionsService
      .addQuestion(
        this.sheetId,
        new Question({
          answer: this.form.answer?.value,
          question: this.form?.answer?.value,
        })
      )
      .subscribe(
        (success) => {
          this.snackbar.open({
            message: 'Question added',
            color: 'accent',
            sucess: true,
          });
          this.form = new QuestionForm();
          try {
            this.loadingService.stop();
          } catch (error) {}
        },
        (error) => {
          this.loadingService.stop();
          if (error instanceof AppException) {
            this.snackbar.open({
              message: error?.message || 'Error Creating question',
              color: 'warn',
            });
          }
        }
      );
  }

  updateQuestion(question: Question) {
    this.loadingService.start();
    this.questionsService
      .updateQuestion(
        question.id,
        new Question({
          ...question,
          answer: this.form.answer?.value,
          question: this.form?.answer?.value,
        })
      )
      .subscribe(
        (success) => {
          this.snackbar.open({
            message: 'Question and answer updated',
            color: 'accent',
            sucess: true,
          });
          this.form = new QuestionForm();
          try {
            this.loadingService.stop();
          } catch (error) {}
        },
        (error) => {
          this.loadingService.stop();
          if (error instanceof AppException) {
            this.snackbar.open({
              message: error?.message || 'Error updating question',
              color: 'warn',
            });
          }
        }
      );
  }
}
