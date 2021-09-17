import {
  ParsingOptions,
  read,
  Sheet2JSONOpts,
  utils,
  WorkBook,
  WorkSheet,
  writeFile,
} from 'xlsx';
import { AppModel } from '../models/app-model';

export class SpreadsheetUtil extends AppModel<SpreadsheetUtil> {
  defaultSheet: string = 'sheet';
  defaultWorkbook: string = 'book';

  generatWorkBook<T extends object>(params: {
    data: T[];
    filename?: string;
    sheetName?: string;
  }): WorkBook {
    params = {
      ...params,
      filename: params.filename ?? this.defaultWorkbook,
      sheetName: params.sheetName ?? this.defaultSheet,
    };
    const ws: WorkSheet = utils.json_to_sheet(params.data);
    const wb: WorkBook = utils.book_new();
    utils.book_append_sheet(wb, ws, params.sheetName);
    return wb;
  }

  downloadWorkBook(wb: WorkBook, filename: string) {
    return writeFile(wb, filename);
  }

  convertRawToWorkBook(data: any, options?: ParsingOptions): WorkBook {
    return read(
      data,
      options ?? {
        type: 'binary',
      }
    );
  }

  readSheet(wb: WorkBook, sheet: string): WorkSheet {
    return wb.Sheets[sheet];
  }

  getJSON<T>(sheet: WorkSheet, options?: Sheet2JSONOpts): T[] {
    options = options ?? {
      defval: null,
      header: 1,
      rawNumbers: false,
      raw: false,
    };
    return utils.sheet_to_json(sheet, options);
  }

  rawToJsonArray<T>(data: any, options?: ParsingOptions): T[] {
    const wb = this.convertRawToWorkBook(data, options);
    let rows: any[] = [];
    for (const sheetName in wb.Sheets) {
      rows.push(...this.getJSON<T>(wb.Sheets[sheetName]));
    }
    if (rows.length > 0) {
      const header = rows.shift();
      rows = rows.map((row) => {
        let mapped: any = {};
        for (let i = 0; i < row.length; i++) {
          mapped[header[i]] = row[i];
        }
        return mapped;
      });
    }
    return rows;
  }
}
