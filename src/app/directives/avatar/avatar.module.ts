import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CircleAvatarComponent } from './circle-avatar/circle-avatar.component';

@NgModule({
  declarations: [CircleAvatarComponent],
  exports: [CircleAvatarComponent],
  imports: [CommonModule],
})
export class AvatarModule {}
