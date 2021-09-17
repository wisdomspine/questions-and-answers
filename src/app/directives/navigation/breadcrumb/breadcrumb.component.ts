import {
  AfterContentInit,
  Component,
  ContentChild,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit, AfterContentInit {
  @ContentChild(BreadcrumbComponent)
  child!: BreadcrumbComponent;

  constructor() {}
  ngAfterContentInit(): void {}

  ngOnInit(): void {}
}
