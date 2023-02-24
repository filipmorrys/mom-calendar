import { Component, OnInit } from '@angular/core';
import { CalendarService } from '../calendar/calendar.service';
import { Day, MonthlyCalendar } from '../model/model';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {

  monthlyCalendar: MonthlyCalendar;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    console.log("Cargando calendario mensual");
    this.calendarService.currentMonthlyCalendar().subscribe(
      (month) => {
        this.monthlyCalendar = month;
        console.log("Calendario mensual", this.monthlyCalendar); 
      } 
    );
  }

  days(dayOfWeek: number): Day[]  {
    let days: Day[] = [];
    if (!this.monthlyCalendar) {
      return days;
    }
    for (let week of this.monthlyCalendar.weeks) {
      days.push(week.days[dayOfWeek]);
    }
    return days;
  }

}
