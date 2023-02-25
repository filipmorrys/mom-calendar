import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import * as moment from 'moment';
import { CalendarService } from '../calendar/calendar.service';
import { HOUR_LABELS, PERSONS } from '../model/master.data';
import { Day, MonthlyCalendar } from '../model/model';

@Component({
  selector: 'app-monthly-calendar',
  templateUrl: './monthly-calendar.component.html',
  styleUrls: ['./monthly-calendar.component.css']
})
export class MonthlyCalendarComponent implements OnInit {

  monthlyCalendar: MonthlyCalendar;

  constructor(private calendarService: CalendarService) { }

  ngOnInit(): void {
    console.log("Cargando calendario mensual");
    this.calendarService.currentMonthlyCalendar().subscribe(
      (month) => {
        this.monthlyCalendar = month;
        console.log("Calendario mensual", this.monthlyCalendar);
      }
    );
  }

  days(dayOfWeek: number): Day[] {
    let days: Day[] = [];
    if (!this.monthlyCalendar) {
      return days;
    }
    for (let week of this.monthlyCalendar.weeks) {
      days.push(week.days[dayOfWeek]);
    }
    return days;
  }

  assignations(day: Day): any[] {
    let assignations = [];
    let assignation = { name: '', initHour: '', color: '' };
    for (let i = 0; i < day.hours.length; i++) {
      let name = day.hours[i];
      if (name != assignation.name) {
        assignation = {
          name: name,
          initHour: HOUR_LABELS[i],
          color: PERSONS.find(p => p.name == name).color
        };
        if (assignation.name != '') {
          assignations.push(assignation);
        }
      }
    }

    return assignations;
  }

  calculateClasses(day: Day): string[] {
    if (day.date.getMonth() != this.monthlyCalendar.firstDay.getMonth()) {
      return ['out-of-month'];
    }
    return [];
  }

  previousMonth() {
    let m = moment(this.monthlyCalendar.firstDay).subtract(1, 'months').date(1);
    console.log("Previous month", m.toISOString());
    this.calendarService.getMonthlyCalendar(m).subscribe(
      (month) => this.monthlyCalendar = month
    );
  }

  nextMonth() {
    let m = moment(this.monthlyCalendar.firstDay).add(1, "months").date(1);
    console.log("Next month", m.toISOString());
    this.calendarService.getMonthlyCalendar(m).subscribe(
      (month) => this.monthlyCalendar = month
    );
  }

  print() {
    let doc = new jsPDF('l', 'mm', [1900, 1900]);

    doc.html(document.body, {
      callback: function (doc) {
        doc.save();
      },
      x: 40,
      y: 40
    });
  }

}
