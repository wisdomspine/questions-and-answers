import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AppException } from '../core/models/exceptions/app-exception';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  static readonly sheetsObjectStoreName = 'sheets';
  static readonly questionsObjectStoreName = 'questions';
  private _db!: IDBDatabase;
  constructor() {}

  private initDb() {
    if (!window.indexedDB)
      throw new AppException({
        message: "Permission not granted or Browser doesn't support IndexedDB",
      });
    const promise = new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(
        environment.db,
        environment.dbVersion
      );
      request.onerror = (event) => {
        reject(
          new AppException({
            message: `${
              (event.target as any).errorCode
            } :: Permission not granted or Browser doesn't support IndexedDB`,
          })
        );
      };

      request.onsuccess = (event) => {
        resolve((event.target as any).result);
      };

      request.onupgradeneeded = (event) => {
        const db: IDBDatabase = (event.target as any).result;

        db.createObjectStore(DatabaseService.sheetsObjectStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });

        db.createObjectStore(DatabaseService.questionsObjectStoreName, {
          keyPath: 'id',
          autoIncrement: true,
        });

        resolve(db);
      };
    });

    return from(promise).pipe(
      tap((database) => {
        this._db = database;
      })
    );
  }

  get db() {
    return this._db ? of(this._db) : this.initDb();
  }

  containsStore(storeName: string): Observable<boolean> {
    return this.db.pipe(map((db) => db.objectStoreNames.contains(storeName)));
  }
}
