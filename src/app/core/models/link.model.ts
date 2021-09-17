import { SafeUrl } from '@angular/platform-browser';

export interface Link {
  text?: string;
  href?: string | SafeUrl;
  tooltip?: string;
}
