import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MonthlyCalendarComponent } from './monthly-calendar/monthly-calendar.component';

const routes: Routes = [
  { path: '', redirectTo: '/weekly-calendar', pathMatch: 'full' },
  { path: 'monthly-calendar', component: MonthlyCalendarComponent },
  { path: 'weekly-calendar', component: CalendarComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CalendarComponent,
    DialogComponent,
    MonthlyCalendarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
