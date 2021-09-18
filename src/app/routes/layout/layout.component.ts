import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDialog } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PortalLink } from '../../core/models/portal-link';
import { SheetTitleComponent } from '../../dialogs/sheet-title/sheet-title.component';
import { Sheet } from '../../models/sheet.model';
import { Endpoints } from '../endpoints';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('sidenav', [
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.3s 0s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LayoutComponent implements OnInit, OnDestroy {
  private sizeChangeSUbscription!: Subscription;
  constructor(
    mediaOserver: MediaObserver,
    private readonly matDialog: MatDialog,
    private router: Router
  ) {
    this.sizeChangeSUbscription = mediaOserver
      .asObservable()
      .subscribe((change) => {
        this.sidenav?.close();
      });
  }
  ngOnDestroy(): void {
    this.sizeChangeSUbscription?.unsubscribe();
  }
  kEndpoints = Endpoints;
  ngOnInit(): void {}

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
        if (e instanceof Sheet) {
          this.router.navigate([Endpoints.generateSheetUrl(e.id)]);
        }
      });
  }

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  navLinks: PortalLink[] = [
    {
      link: {
        href: Endpoints.landingPageUrl,
        tooltip: 'Go home',
        text: 'Home',
      },
    },
    {
      link: {
        href: Endpoints.recentSheetsUrl,
        tooltip: 'Recent question sheets',
        text: 'Recent',
      },
    },
  ];
}
