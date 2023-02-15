import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Day, WeeklyCalendar } from '../model/model';
import { EMPTY, VIO } from '../model/master.data';


@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  previousWeeklyCalendar(weeklyCalendar: WeeklyCalendar): WeeklyCalendar {
    let lastDate = weeklyCalendar.days[0].date;
    let m = moment(lastDate);
    m.subtract(7, "days");

    let dates = this.datesOfWeek(m);
    return this.createWeeklyCalendar(dates);
  }

  nextWeeklyCalendar(weeklyCalendar: WeeklyCalendar): WeeklyCalendar {
    let lastDate = weeklyCalendar.days[6].date;
    let m = moment(lastDate);
    m.add(1, "days");

    let dates = this.datesOfWeek(m);
    return this.createWeeklyCalendar(dates);
  }

  constructor() { }

  /**
   * 
   * @returns Retorna un Date[] con todos los día de la semana
   */
  datesOfCurrentWeek() {
    let m = moment();
    while (m.day() !== 1) {
      m.subtract(1, "days");
    }

    return this.datesOfWeek(m);
  }

  /**
   * Retorna un Date[] con todos los días de la semana, a partir del primer día
   * @param m primer día de la semana
   * @returns 
   */
  private datesOfWeek(m: moment.Moment) {
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
    let dates = this.datesOfCurrentWeek();
    return this.createWeeklyCalendar(dates);
  }

  private createWeeklyCalendar(dates: Date[]) {
    return new WeeklyCalendar([
      new Day(dates[0], [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]),
      new Day(dates[1], [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]),
      new Day(dates[2], [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]),
      new Day(dates[3], [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]),
      new Day(dates[4], [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]),
      new Day(dates[5], [VIO, VIO, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]),
      new Day(dates[6], [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, VIO, VIO])
    ]);
  }
}
