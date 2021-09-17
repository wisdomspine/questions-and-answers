export class Endpoints {
  constructor() {
    throw new Error('class [Endpoints] is not instantiable');
  }

  static get landingPage(): string {
    return '';
  }

  static get landingPageUrl(): string {
    return `/${this.landingPage}`;
  }

  static get recentSheets(): string {
    return 'recent';
  }

  static get recentSheetsUrl(): string {
    return `/${this.recentSheets}`;
  }

  static get sheet(): string {
    return ':questionId';
  }

  static generateSheetUrl(questionId: string): string {
    return `${this.recentSheetsUrl}/${questionId}`;
  }
}
