import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-card',
  templateUrl: './overview-card.component.html',
  styleUrls: ['./overview-card.component.scss'],
})
export class OverviewCardComponent implements OnInit {
  @Input()
  backgroundColorClass: string = 'app-background-color-primary-100';

  @Input()
  backgroundColor!: string;

  constructor() {}

  ngOnInit(): void {}
}
