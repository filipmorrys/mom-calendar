import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { day, Day, monthlyCalendar, MonthlyCalendar, weeklyCalendar, WeeklyCalendar } from '../model/model';

const API_URL = "http://localhost:8979/mom/calendar/api";
const HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/json' });


@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(private http: HttpClient) { }

  currentMonthlyCalendar(): Observable<MonthlyCalendar> {
    // primer día del mes actual
    let m = moment().date(1);
    console.log("Primer día del mes actual", m.toISOString());
    return this.getMonthlyCalendar(m);
  }

  getMonthlyCalendar(m: moment.Moment): Observable<MonthlyCalendar> {
    let firstDay = m.clone();
    let currMonth = m.month();
    // lunes de la primera semana del mes actual
    m.weekday(1);
    console.log("Lunes de la primera semana del mes actual", m.toISOString());

    let lastMonth = currMonth;
    let strWeekIds: string = '';
    let weekIds: string[] = [];
    while (lastMonth == currMonth) {
      if (strWeekIds != '') {
        strWeekIds += ',';
      }
      let weekId = m.toDate().toISOString().slice(0, 10);
      strWeekIds += weekId;
      weekIds.push(weekId);
      lastMonth = m.add(7, "days").month();
    }

    return this.http.get<WeeklyCalendar[]>(API_URL + "/calendars/" + strWeekIds)
      .pipe(
        map(
          // Transformación necesaria porque el campo date me llega como string
          (cals) => {
            let calendars: WeeklyCalendar[] = [];
            for (let cal of cals) {
              calendars.push(transformWeeklyCalendar(cal));
            }
            return this.completeCalendars(weekIds, calendars);
          }
        ),
        map(
          (cals) => monthlyCalendar(firstDay.date(1).toDate(), cals)
        )
      );

  }

  completeCalendars(weekIds: string[], calendars: WeeklyCalendar[]): WeeklyCalendar[] {
    let weeks: WeeklyCalendar[] = [];
    for (let weekId of weekIds) {
      let week = calendars.find(c => c.id == weekId);
      if (!week) {
        let m = moment(weekId);
        week = this.newWeeklyCalendar(this.datesOfWeek(m));
      }
      weeks.push(week);
    }

    return weeks;
  }

  /**
   * Devuelve el calendario de la semana actual. Si hay uno en base de datos lo obtiene, si no
   * devuelve una semana tipo. 
   * @returns devuelve el calendario de la semana actual.
   */
  currentWeeklyCalendar(): Observable<WeeklyCalendar> {
    let dates = this.datesOfCurrentWeek();
    return this.getWeeklyCalendar(dates);
  }

  /**
   * Muestra el calendario de la semana anterior
   * @param weeklyCalendar semana actual
   * @returns 
   */
  previousWeeklyCalendar(weeklyCalendar: WeeklyCalendar): Observable<WeeklyCalendar> {
    let lastDate = weeklyCalendar.days[0].date;
    let m = moment(lastDate);
    m.subtract(7, "days");

    let dates = this.datesOfWeek(m);
    return this.getWeeklyCalendar(dates);
  }

  /**
   * Muestra el calendario de la semana siguiente 
   * @param weeklyCalendar semana actual
   * @returns 
   */
  nextWeeklyCalendar(weeklyCalendar: WeeklyCalendar): Observable<WeeklyCalendar> {
    let lastDate = weeklyCalendar.days[6].date;
    let m = moment(lastDate);
    m.add(1, "days");

    let dates = this.datesOfWeek(m);
    return this.getWeeklyCalendar(dates);
  }

  /**
   * Muestra el calendario de una semana concreta 
   * @param weeklyCalendar semana concreta
   * @returns 
   */
  customWeeklyCalendar(weeklyCalendar: WeeklyCalendar): Observable<WeeklyCalendar> {
    let firstDate = weeklyCalendar.days[0].date;
    let m = moment(firstDate);

    let dates = this.datesOfWeek(m);
    return this.getWeeklyCalendar(dates);
  }

  private getWeeklyCalendar(dates: Date[]): Observable<WeeklyCalendar> {
    let weekId = dates[0].toISOString().slice(0, 10);
    let subject = new BehaviorSubject<WeeklyCalendar>(this.newWeeklyCalendar(dates));
    this.http.get(API_URL + "/" + weekId)
      .pipe(
        map(
          // Transformación necesaria porque el campo date me llega como string
          (cal) => transformWeeklyCalendar(cal)
        )
      )
      .subscribe(subject);
    return subject;
  }

  saveWeeklyCalendar(cal: WeeklyCalendar): Observable<WeeklyCalendar> {
    return this.http.post<WeeklyCalendar>(API_URL, cal, { headers: HTTP_HEADERS });
  }

  deleteWeeklyCalendar(id: string): Observable<void> {
    console.log("DELETE " + API_URL + "/" + id)
    return this.http.delete<void>(API_URL + "/" + id);
  }

  private newWeeklyCalendar(dates: Date[]) {
    return weeklyCalendar([
      day(dates[0], ['Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', '', '', 'Vio', 'Vio']),
      day(dates[1], ['Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', '', '', 'Vio', 'Vio']),
      day(dates[2], ['Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', '', '', 'Vio', 'Vio']),
      day(dates[3], ['Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', '', '', 'Vio', 'Vio']),
      day(dates[4], ['Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', 'Vio', '', '', 'Vio', 'Vio']),
      day(dates[5], ['Vio', 'Vio', '', '', '', '', '', '', '', '', '', '', '', '', '']),
      day(dates[6], ['', '', '', '', '', '', '', '', '', '', '', '', '', 'Vio', 'Vio'])
    ]);
  }

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



}

function transformWeeklyCalendar(cal: any): WeeklyCalendar {
  let days: Day[] = [];
  for (let dayOfWeek of cal.days) {
    let d = day(new Date(dayOfWeek.date), dayOfWeek.hours);
    days.push(d);
  }
  let w = weeklyCalendar(days);
  console.log("weeklyCalendar transformado", w);
  return w;
}


