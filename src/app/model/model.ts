
export interface MonthlyCalendar {
    id: string;
    name: string;
    firstDay: Date;
    weeks: WeeklyCalendar[];
}

/**
 * Crea un calendario mensual
 * @param firstDay El primer día del mes
 * @param weeks todos los calendarios mensuales del mes. 
 */
export function monthlyCalendar(firstDay: Date, weeks: WeeklyCalendar[]): MonthlyCalendar {
    let id = firstDay.toISOString().slice(0, 10);
    let name = getMonth(firstDay) + " de " + firstDay.getFullYear;
    return {
        id: id,
        name: name,
        firstDay: firstDay,
        weeks: weeks
    }
}

export function weeklyCalendar(days: Day[]): WeeklyCalendar {
    let id = days[0].date.toISOString().slice(0, 10);
    let firstDay = days[0];
    let lastDay = days[6];
    let name = firstDay.dayAndMonth + " - " + lastDay.dayAndMonth;

    return { id: id, name: name, days: days };
}


/**
 * Interfaz de calendario semanal
 */
export interface WeeklyCalendar {
    id: string;
    name: string;
    days: Day[];
}

export function day(date: Date, hours: string[]): Day {
    let index = date.getDay();
    let id = date.toISOString().slice(0, 10);
    let dayOfWeek = getDayOfWeek(date);
    let dayAndMonth = getDayAndMonth(date);

    return { id: id, index: index, date: date, hours: hours, dayOfWeek: dayOfWeek, dayAndMonth: dayAndMonth };
}

function getDayOfWeek(date: Date): string {
    switch (date.getDay()) {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        default:
            return "Sábado";
    }
}

function getMonth(date: Date): string {
    switch (date.getMonth()) {
        case 0:
            return "Enero";
        case 1:
            return "Febrero";
        case 2:
            return "Marzo";
        case 3:
            return "Abril";
        case 4:
            return "Mayo";
        case 5:
            return "Junio";
        case 6:
            return "Julio";
        case 7:
            return "Agosto";
        case 8:
            return "Septiembre";
        case 9:
            return "Octubre";
        case 10:
            return "Noviembre";
        default:
            return "Diciembre";
    }
}

function getDayAndMonth(date: Date): string {
    return date.getDate() + " de " + getMonth(date);
}

/**
 * Interfaz de día de la semana en un calendario
 */
export interface Day {
    id: string;
    index: number;
    date: Date;
    hours: string[];
    dayOfWeek: string;
    dayAndMonth: string;
}

export class Person {
    name: string;
    color: string;

    constructor(name: string, color: string) {
        this.name = name;
        this.color = color;
    }
}


export class Assignation {
    init: number;
    end: number;
    day: number;
    person: Person;

    constructor(init: number, end: number, day: number, person: Person) {
        this.init = init;
        this.end = end;
        this.day = day;
        this.person = person;
    }
}