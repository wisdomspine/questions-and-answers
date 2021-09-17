import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-avatar',
  templateUrl: './circle-avatar.component.html',
  styleUrls: ['./circle-avatar.component.scss'],
})
export class CircleAvatarComponent implements OnInit {
  private _color: string = 'primary';

  @Input()
  radius: number = 50;

  @Input()
  set color(newColor: string) {
    this._color = newColor ?? this._color;
  }

  @Input()
  frameClass!: string;

  get color(): string {
    return this._color;
  }

  constructor() {}

  ngOnInit(): void {}
}
