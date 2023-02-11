import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CalendarService } from './calendar.service';
import { HOUR_LABELS, EMPTY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, SATURDAY, FRIDAY, SUNDAY } from '../model/master.data';
import { Assignation, Day, Person, WeeklyCalendar } from '../model/model'

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {


  hourLabels: string[] = [];
  weeklyCalendar: WeeklyCalendar;
  initIndex: number = -1;
  endIndex: number = -1;
  dayIndex: number = -1;
  @ViewChild("dialog") dialog: any;

  constructor(private calendarService: CalendarService) {
    // Creamos una semena tipo
    this.weeklyCalendar = this.calendarService.currentWeeklyCalendar();
  }

  ngOnInit(): void {
    this.hourLabels = HOUR_LABELS;
  }

  /**
   * Devuelve la clase de estilos en base a la asignación
   * @param dayOfWeek 
   * @param index 
   * @returns 
   */
  selectClass(dayOfWeek: Day, index: number) {
    if (dayOfWeek.hours[index] == EMPTY) {
      return "";
    }
    if (index == 0 || dayOfWeek.hours[index] != dayOfWeek.hours[index - 1]) {
      return "assignation-start";
    }
    if (index == dayOfWeek.hours.length - 1 || dayOfWeek.hours[index] != dayOfWeek.hours[index + 1]) {
      return "assignation-end";
    }

    return "assignation";
  }

  /**
   * Devuelve true si la hora corresponde a un inicio de asignación
   * @param dayOfWeek 
   * @param index 
   * @returns 
   */
  isAssignationStart(dayOfWeek: Day, index: number): boolean {
    if (dayOfWeek.hours[index] == EMPTY) {
      return false;
    }
    if (index == 0 || dayOfWeek.hours[index] != dayOfWeek.hours[index - 1]) {
      return true;
    }

    return false;
  }

  /**
   * Abre el diálogo para asignar horas
   * @param day 
   * @param index 
   */
  assignationDialog(day: Day, index: number) {
    console.log("asignando horas", day, index);
    this.initIndex = index;
    let i = index;
    while (i < day.hours.length - 1 && day.hours[i+1] == EMPTY) {
      i++;
    }
    this.endIndex = i;
    this.dayIndex = day.index;
    this.dialog.show();
  }

  assign(ev: Assignation) {
    let day = this.weeklyCalendar.days.find(d => d.index === ev.day);

    for (let i=ev.init; i<=ev.end; i++) {
      day.hours[i] = ev.person;
    }
  }
}
