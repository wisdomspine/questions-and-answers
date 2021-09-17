import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Subscription } from 'rxjs';
import { AppPaginator } from '../models/app-paginator';

@Component({
  selector: 'app-page-links',
  templateUrl: './page-links.component.html',
  styleUrls: ['./page-links.component.scss'],
})
export class PageLinksComponent implements OnInit, OnDestroy {
  private minLinks: number = 5;
  private controllerSubscription!: Subscription;

  @Input()
  controller!: AppPaginator;

  @Input()
  color!: ThemePalette;

  @Input()
  showEllipsis: boolean = true;

  @Input()
  showJumpToFirst: boolean = true;

  @Input()
  showJumpToLast: boolean = true;

  @Input()
  showPrev: boolean = true;

  @Input()
  showNext: boolean = true;

  private _maxLinks: number = this.minLinks;
  @Input()
  set maxLinks(links: number) {
    links = links ?? 0;
    if (links > this.minLinks) this._maxLinks = links;
  }

  get maxLinks(): number {
    return this._maxLinks;
  }

  constructor() {}
  ngOnDestroy(): void {
    this.controllerSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.calculateNavigation();
    this.controllerSubscription = this.controller.page.subscribe((pe) => {
      this.calculateNavigation();
    });
  }

  offset: number = 0;
  canShowStartEllipsis: boolean = false;
  canShowEndEllipsis: boolean = true;
  links: number[] = [];
  canShowEllipsis: boolean = true;
  selected: number = 0;
  private calculateNavigation() {
    const totalPages = this.controller.getNumberOfPages();
    this.selected = this.controller.pageIndex;
    {
      // offset
      let currentPage: number = this.controller.pageIndex;
      let offset: number = 0;
      while (currentPage + 2 > offset + this.maxLinks) {
        offset += this.maxLinks;
      }
      offset -= 1;
      offset = Math.max(0, offset);
      this.offset = offset;
    }
    {
      this.canShowEllipsis =
        this.showEllipsis && this.controller.getNumberOfPages() > this.maxLinks;
    }
    {
      this.canShowStartEllipsis = this.offset !== 0 && this.canShowEllipsis;
    }
    {
      this.canShowEndEllipsis =
        this.offset + this.maxLinks + 1 <=
          (totalPages ?? Number.POSITIVE_INFINITY) && this.canShowEllipsis;
    }
    {
      // generate links
      let offset = this.offset;

      let end = offset + this.maxLinks - 1;

      end = Math.min(this.controller.getNumberOfPages() - 1, end);

      const availablePages = end - offset + 1;
      let pagesShortOfMax = this._maxLinks - availablePages;
      if (pagesShortOfMax > 0) {
        offset -= pagesShortOfMax;
        offset = Math.max(0, offset);
      }
      let links: number[] = [];
      while (offset <= end) {
        links.push(offset++);
      }
      this.links = links;
    }
  }

  jumpTo(page: number) {
    this.controller.pageIndex = page;
  }

  trackPageLinks(index: number, item: number) {
    return item === item;
  }
}
