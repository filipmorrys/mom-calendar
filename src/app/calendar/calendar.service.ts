import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Day, WeeklyCalendar } from '../model/model';
import { HOUR_LABELS, EMPTY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, SATURDAY, FRIDAY, SUNDAY } from '../model/master.data';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  /**
   * 
   * @returns Retorna un Date[] con todos los día de la semana
   */
  datesOfWeek() {
    let m = moment();
    while (m.day() !== 1) {
      m.subtract(1, "days");
    }

    let dates = [];
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");
    dates.push(m.toDate());
    m.add(1, "days");

    return dates;
  }

  /**
   * Devuelve el calendario de la semana actual. Si hay uno en base de datos lo obtiene, si no
   * devuelve una semana tipo. 
   * @returns devuelve el calendario de la semana actual.
   */
  currentWeeklyCalendar() {
    let dates = this.datesOfWeek();
    
    return new WeeklyCalendar([
      new Day(dates[0], MONDAY),
      new Day(dates[1], TUESDAY),
      new Day(dates[2], WEDNESDAY),
      new Day(dates[3], THURSDAY),
      new Day(dates[4], FRIDAY),
      new Day(dates[5], SATURDAY),
      new Day(dates[6], SUNDAY)
    ]);
  }
}
