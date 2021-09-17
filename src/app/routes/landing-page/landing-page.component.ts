import { Component, OnInit } from '@angular/core';
import { Endpoints } from '../endpoints';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  kEndPoints = Endpoints;

  constructor() {}

  ngOnInit(): void {}
}
