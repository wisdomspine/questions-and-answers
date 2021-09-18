import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingPageComponent } from './routes/landing-page/landing-page.component';
import { QuestionSheetComponent } from './routes/question-sheet/question-sheet.component';
import { LayoutComponent } from './routes/layout/layout.component';
import { RecentSheetsComponent } from './routes/recent-sheets/recent-sheets.component';
import { CoreModule, FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { SheetTitleComponent } from './dialogs/sheet-title/sheet-title.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NavigationModule } from './directives/navigation/navigation.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DialogModule } from './directives/dialog/dialog.module';
import { FormHelpersModule } from './directives/form-helpers/form-helpers.module';
@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    QuestionSheetComponent,
    LayoutComponent,
    RecentSheetsComponent,
    SheetTitleComponent,
  ],
  imports: [
    CoreModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    NavigationModule,
    MatDialogModule,
    MatSnackBarModule,
    DialogModule,
    FormHelpersModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
