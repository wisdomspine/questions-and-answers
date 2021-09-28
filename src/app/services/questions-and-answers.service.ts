import { Injectable } from '@angular/core';
import { BehaviorSubject, from, of, zip } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { AppException } from '../core/models/exceptions/app-exception';
import { FileUtil } from '../core/utils/file.util';
import { ObjectUtil } from '../core/utils/object.util';
import { changeCaseTo } from '../directives/pipes/change-case.pipe';
import { Question } from '../models/question.model';
import { Sheet } from '../models/sheet.model';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root',
})
export class QuestionsAndAnswersService {
  private sheetsSubject: BehaviorSubject<Sheet[]> = new BehaviorSubject<
    Sheet[]
  >([]);

  private questionsSubject: BehaviorSubject<Question[]> = new BehaviorSubject<
    Question[]
  >([]);

  constructor(private readonly dbService: DatabaseService) {
    setTimeout(() => {
      this.init();
    });
  }

  private init() {
    this.dbService.db.subscribe((db) => {
      const request = db
        .transaction([DatabaseService.sheetsObjectStoreName], 'readonly')
        .objectStore(DatabaseService.sheetsObjectStoreName)
        .getAll();
      request.onsuccess = (event) => {
        this.sheetsSubject.next(
          (request.result ?? []).map((sheet) => new Sheet(sheet))
        );
      };
    });

    this.dbService.db.subscribe((db) => {
      const request = db
        .transaction([DatabaseService.questionsObjectStoreName], 'readonly')
        .objectStore(DatabaseService.questionsObjectStoreName)
        .getAll();
      request.onsuccess = (event) => {
        this.questionsSubject.next(
          (request.result ?? []).map((question) => new Question(question))
        );
      };
    });
  }

  querySheets(search?: string) {
    return ObjectUtil.deepSearch(search ?? '', this.sheetsSubject.value ?? []);
  }

  querySheetsChanges(search?: string) {
    return this.sheetsSubject.pipe(
      map((sheets) => ObjectUtil.deepSearch(search ?? '', sheets))
    );
  }

  querySheetChanges(sheetId: number) {
    return this.sheetsSubject.pipe(
      map((sheets) => sheets.find((sheet) => sheet.id == sheetId))
    );
  }

  querySheet(sheetId: number) {
    return (this.sheetsSubject.value ?? []).find(
      (sheet) => sheet.id == sheetId
    );
  }

  queryQuestions(sheetId?: number, search?: string) {
    let questions = this.questionsSubject.value ?? [];
    if (sheetId)
      questions = questions.filter((question) => question.sheetId == sheetId);
    return ObjectUtil.deepSearch(search ?? '', questions);
  }

  queryQuestionsChanges(sheetId?: number, search?: string) {
    return this.questionsSubject.pipe(
      map((questions) => {
        if (sheetId)
          questions = questions.filter(
            (question) => question.sheetId == sheetId
          );
        return ObjectUtil.deepSearch(search ?? '', questions);
      })
    );
  }

  addSheet(sheet: Sheet) {
    const raw: any = { ...sheet };
    delete raw.id;

    return this.dbService.db.pipe(
      switchMap((database) => {
        const promise: Promise<Sheet> = new Promise((resolve, reject) => {
          const request = database
            .transaction([DatabaseService.sheetsObjectStoreName], 'readwrite')
            .objectStore(DatabaseService.sheetsObjectStoreName)
            .add(raw);
          request.onsuccess = (event) => {
            resolve(new Sheet({ ...sheet, id: request.result as any }));
          };

          request.onerror = (event) => {
            reject(
              new AppException({
                message: `${
                  (event.target as any).errorCode
                } :: Sheet not added`,
              })
            );
          };
        });

        return from(promise);
      }),
      tap((sheet) => {
        //  update sheets
        this.dbService.db.subscribe((db) => {
          const request = db
            .transaction([DatabaseService.sheetsObjectStoreName], 'readonly')
            .objectStore(DatabaseService.sheetsObjectStoreName)
            .getAll();
          request.onsuccess = (event) => {
            this.sheetsSubject.next(
              (request.result ?? []).map((sheet) => new Sheet(sheet))
            );
          };
        });
      })
    );
  }

  addQuestion(sheetId: number, question: Question) {
    const raw: any = { ...question, sheetId };
    delete raw.id;

    return this.dbService.db.pipe(
      switchMap((database) => {
        const promise: Promise<Question> = new Promise((resolve, reject) => {
          const request = database
            .transaction(
              [DatabaseService.questionsObjectStoreName],
              'readwrite'
            )
            .objectStore(DatabaseService.questionsObjectStoreName)
            .add(raw);
          request.onsuccess = (event) => {
            resolve(new Question({ ...raw, id: request.result as any }));
          };

          request.onerror = (event) => {
            reject(
              new AppException({
                message: `${
                  (event.target as any).errorCode
                } :: Question not added`,
              })
            );
          };
        });

        return from(promise);
      }),
      tap((question) => {
        //  update sheets
        this.dbService.db.subscribe((db) => {
          const request = db
            .transaction([DatabaseService.questionsObjectStoreName], 'readonly')
            .objectStore(DatabaseService.questionsObjectStoreName)
            .getAll();
          request.onsuccess = (event) => {
            this.questionsSubject.next(
              (request.result ?? []).map((question) => new Question(question))
            );
          };
        });
      })
    );
  }

  updateSheet(sheetId: number, sheet: Partial<Sheet>) {
    const raw: any = { ...new Sheet({ ...sheet, id: sheetId }) };

    return this.dbService.db.pipe(
      switchMap((database) => {
        const promise: Promise<Sheet> = new Promise((resolve, reject) => {
          const request = database
            .transaction([DatabaseService.sheetsObjectStoreName], 'readwrite')
            .objectStore(DatabaseService.sheetsObjectStoreName)
            .put(raw);
          request.onsuccess = (event) => {
            resolve(new Sheet({ ...sheet, id: request.result as any }));
          };

          request.onerror = (event) => {
            reject(
              new AppException({
                message: `${
                  (event.target as any).errorCode
                } :: Sheet not updated`,
              })
            );
          };
        });

        return from(promise);
      }),
      tap((sheet) => {
        //  update sheets
        this.dbService.db.subscribe((db) => {
          const request = db
            .transaction([DatabaseService.sheetsObjectStoreName], 'readonly')
            .objectStore(DatabaseService.sheetsObjectStoreName)
            .getAll();
          request.onsuccess = (event) => {
            this.sheetsSubject.next(
              (request.result ?? []).map((sheet) => new Sheet(sheet))
            );
          };
        });
      })
    );
  }

  updateQuestion(questionId: number, question: Partial<Question>) {
    const raw: any = { ...new Question({ ...question, id: questionId }) };

    return this.dbService.db.pipe(
      switchMap((database) => {
        const promise: Promise<Question> = new Promise((resolve, reject) => {
          const request = database
            .transaction(
              [DatabaseService.questionsObjectStoreName],
              'readwrite'
            )
            .objectStore(DatabaseService.questionsObjectStoreName)
            .put(raw);
          request.onsuccess = (event) => {
            resolve(new Question({ ...raw, id: request.result as any }));
          };

          request.onerror = (event) => {
            reject(
              new AppException({
                message: `${
                  (event.target as any).errorCode
                } :: Question not added`,
              })
            );
          };
        });

        return from(promise);
      }),
      tap((question) => {
        //  update sheets
        this.dbService.db.subscribe((db) => {
          const request = db
            .transaction([DatabaseService.questionsObjectStoreName], 'readonly')
            .objectStore(DatabaseService.questionsObjectStoreName)
            .getAll();
          request.onsuccess = (event) => {
            this.questionsSubject.next(
              (request.result ?? []).map((question) => new Question(question))
            );
          };
        });
      })
    );
  }

  deleteSheet(sheetId: number) {
    const questions = this.queryQuestions(sheetId);
    return zip(
      ...(questions.length > 0
        ? questions.map((question) => this.deleteQuestion(question.id))
        : [of(0)])
    ).pipe(
      switchMap((res) => {
        console.log(res);
        return this.dbService.db.pipe(
          switchMap((database) => {
            const promise: Promise<void> = new Promise((resolve, reject) => {
              const request = database
                .transaction(
                  [DatabaseService.sheetsObjectStoreName],
                  'readwrite'
                )
                .objectStore(DatabaseService.sheetsObjectStoreName)
                .delete(sheetId);
              request.onsuccess = (event) => {
                resolve();
              };

              request.onerror = (event) => {
                reject(
                  new AppException({
                    message: `${
                      (event.target as any).errorCode
                    } :: Sheet not deleted`,
                  })
                );
              };
            });

            return from(promise);
          }),
          tap((sheet) => {
            //  update sheets
            this.dbService.db.subscribe((db) => {
              const request = db
                .transaction(
                  [DatabaseService.sheetsObjectStoreName],
                  'readonly'
                )
                .objectStore(DatabaseService.sheetsObjectStoreName)
                .getAll();
              request.onsuccess = (event) => {
                this.sheetsSubject.next(
                  (request.result ?? []).map((sheet) => new Sheet(sheet))
                );
              };
            });
          })
        );
      })
    );
  }

  deleteQuestion(questionId: number) {
    return this.dbService.db.pipe(
      switchMap((database) => {
        const promise: Promise<void> = new Promise((resolve, reject) => {
          const request = database
            .transaction(
              [DatabaseService.questionsObjectStoreName],
              'readwrite'
            )
            .objectStore(DatabaseService.questionsObjectStoreName)
            .delete(questionId);
          request.onsuccess = (event) => {
            resolve();
          };

          request.onerror = (event) => {
            reject(
              new AppException({
                message: `${
                  (event.target as any).errorCode
                } :: Question not deleted`,
              })
            );
          };
        });

        return from(promise);
      }),
      tap((sheet) => {
        //  update sheets
        this.dbService.db.subscribe((db) => {
          const request = db
            .transaction([DatabaseService.questionsObjectStoreName], 'readonly')
            .objectStore(DatabaseService.questionsObjectStoreName)
            .getAll();
          request.onsuccess = (event) => {
            this.questionsSubject.next(
              (request.result ?? []).map((question) => new Question(question))
            );
          };
        });
      })
    );
  }

  downloadSheet(sheetId: number) {
    const sheet = this.querySheet(sheetId);
    if (!sheet) return;
    const questions = this.queryQuestions(sheetId) ?? [];

    let text = ``;
    questions.forEach((question, index) => {
      text += `${question.question}\n`;
      (question.answers ?? []).forEach((answer) => {
        text += `${answer.label?.toUpperCase()}. ${answer.answer}\n`;
      });
      text += `ANSWER: ${question.correctAnswer?.label?.toUpperCase()}\n\n`;
    });

    FileUtil.downloadTextFile(`${sheet.title}.txt`, text);
  }
}
