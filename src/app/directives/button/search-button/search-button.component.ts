import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-button',
  templateUrl: './search-button.component.html',
  styleUrls: ['./search-button.component.scss'],
})
export class SearchButtonComponent implements OnInit {
  @Input()
  type: 'reset' | 'submit' | 'button' = 'button';

  constructor() {}

  ngOnInit(): void {}
}
