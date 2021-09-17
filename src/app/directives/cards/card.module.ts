import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { OverviewCardActionsComponent } from './overview-card-actions/overview-card-actions.component';
import { OverviewCardBodyComponent } from './overview-card-body/overview-card-body.component';
import { OverviewCardFooterComponent } from './overview-card-footer/overview-card-footer.component';
import { OverviewCardTitleComponent } from './overview-card-title/overview-card-title.component';

import { OverviewCardComponent } from './overview-card/overview-card.component';

@NgModule({
  declarations: [
    OverviewCardComponent,
    OverviewCardActionsComponent,
    OverviewCardBodyComponent,
    OverviewCardFooterComponent,
    OverviewCardTitleComponent,
  ],
  exports: [
    OverviewCardComponent,
    OverviewCardActionsComponent,
    OverviewCardBodyComponent,
    OverviewCardFooterComponent,
    OverviewCardTitleComponent,
  ],
  imports: [CommonModule, MatCardModule],
})
export class CardModule {}
