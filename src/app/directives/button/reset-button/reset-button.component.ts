import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.scss'],
})
export class ResetButtonComponent implements OnInit {
  @Input()
  type: 'reset' | 'submit' | 'button' = 'reset';
  constructor() {}

  ngOnInit(): void {}
}
