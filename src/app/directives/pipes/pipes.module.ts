import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeCasePipe } from './change-case.pipe';

@NgModule({
  declarations: [ChangeCasePipe],
  imports: [CommonModule],
  exports: [ChangeCasePipe],
})
export class PipesModule {}
