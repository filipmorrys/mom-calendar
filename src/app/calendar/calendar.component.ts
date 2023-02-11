import { Component, OnInit } from '@angular/core';
import { Day, Person, WeeklyCalendar } from '../model/model'

const EMPTY: Person = new Person("", "#FFFFFF");
const VIO: Person = new Person("Vio", "#B9C2D3");
const PEDRO: Person = new Person("Pedro", "#4ECF2B");
const LUCI: Person = new Person("Luci", "#E39CE4");
const ESTHER: Person = new Person("Esther", "#F6EA27");
const FIDE: Person = new Person("Fide", "#9CBCE4");

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  hourLabels: string[] = [];
  weeklyCalendar: WeeklyCalendar;

  ngOnInit(): void {
    this.hourLabels = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h'];
    let monday = new Day('Lunes', [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, ESTHER, ESTHER, VIO, VIO]);
    let tuesday = new Day('Martes', [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, PEDRO, PEDRO, VIO, VIO]);
    let wednesday = new Day('Miércoles', [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, FIDE, FIDE, VIO, VIO]);
    let thursday = new Day('Jueves', [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]);
    let friday = new Day('Viernes', [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, LUCI, LUCI, VIO, VIO]);
    let saturday = new Day('Sábado', [VIO, VIO, PEDRO, PEDRO, PEDRO, PEDRO, PEDRO, ESTHER, ESTHER, ESTHER, ESTHER, ESTHER, ESTHER, LUCI, LUCI]);
    let sunday = new Day('Domingo', [LUCI, LUCI, LUCI, LUCI, LUCI, LUCI, LUCI, FIDE, FIDE, FIDE, FIDE, FIDE, FIDE, VIO, VIO]);

    this.weeklyCalendar = new WeeklyCalendar([monday, tuesday, wednesday, thursday, friday, saturday, sunday]);

    console.log(JSON.stringify(this.weeklyCalendar));

  }

  selectClass(dayOfWeek: Day, index: number) {
    if (dayOfWeek.hours[index] == EMPTY) {
      return "";
    }
    if (index == 0 || dayOfWeek.hours[index] != dayOfWeek.hours[index-1]) {
      return "assignation-start";
    } 
    if (index == dayOfWeek.hours.length-1 || dayOfWeek.hours[index] != dayOfWeek.hours[index+1]) {
      return "assignation-end";
    }

    return "assignation";
  }

  isAssignationStart(dayOfWeek: Day, index: number) {
    if (dayOfWeek.hours[index] == EMPTY) {
      return false;
    }
    if (index == 0 || dayOfWeek.hours[index] != dayOfWeek.hours[index-1]) {
      return true;
    } 

    return false;
  }


}
