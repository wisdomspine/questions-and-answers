import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [BreadcrumbComponent, ProgressBarComponent],
  imports: [CommonModule, MatProgressBarModule],
  exports: [BreadcrumbComponent],
})
export class NavigationModule {}
