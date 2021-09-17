import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-export-button',
  templateUrl: './export-button.component.html',
  styleUrls: ['./export-button.component.scss'],
})
export class ExportButtonComponent implements OnInit {
  @Input()
  type: 'reset' | 'submit' | 'button' = 'button';
  constructor() {}

  ngOnInit(): void {}
}
