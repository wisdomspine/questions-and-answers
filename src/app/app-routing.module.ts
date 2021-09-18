import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatabaseResolver } from './resolver/database.resolver';
import { Endpoints } from './routes/endpoints';
import { LandingPageComponent } from './routes/landing-page/landing-page.component';
import { LayoutComponent } from './routes/layout/layout.component';
import { QuestionSheetComponent } from './routes/question-sheet/question-sheet.component';
import { RecentSheetsComponent } from './routes/recent-sheets/recent-sheets.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: Endpoints.recentSheets,
    component: LayoutComponent,
    resolve: {
      db: DatabaseResolver,
    },
    children: [
      {
        path: '',
        component: RecentSheetsComponent,
      },
      {
        path: Endpoints.sheet,
        component: QuestionSheetComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
