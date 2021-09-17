import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress-button',
  templateUrl: './progress-button.component.html',
  styleUrls: ['./progress-button.component.scss'],
})
export class ProgressButtonComponent implements OnInit {
  @Input()
  loading: boolean = false;

  @Input()
  diameter: number = 24;
  constructor() {}

  ngOnInit(): void {}
}
