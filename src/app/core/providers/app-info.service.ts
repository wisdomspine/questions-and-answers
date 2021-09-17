import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { Link } from '../models/link.model';

@Injectable({
  providedIn: 'root',
})
export class AppInfoService {
  constructor(private domSanitizer: DomSanitizer) {}

  get developer(): Link {
    return {
      text: '@GodOfCode',
      href: this.domSanitizer.bypassSecurityTrustUrl(
        `https://twitter.com/SaboPriest`
      ),
    };
  }

  get version(): string {
    return environment.version;
  }

  get copyrightText(): string {
    return '2021 All Rights Reserved. Zabira Technologies';
  }

  get termsLink(): Link {
    return {
      text: 'Cookie Preferences, Privacy, and Terms.',
      href: this.domSanitizer.bypassSecurityTrustUrl('./'),
    };
  }
}
