export class WeeklyCalendar {
    days: Day[];

    constructor(days: Day[]) {
        this.days = days;
    }

    weekName(): string {
        let firstDay = this.days[0];
        let lastDay = this.days[6];

        return firstDay.dayAndMonth() + " - " + lastDay.dayAndMonth();
    }
}

export class Day {
    index: number;
    date: Date;
    hours: Person[];

    constructor(date: Date, hours: Person[]) {
        this.date = date;
        this.hours = hours;
        this.index = this.date.getDay();
    }

    dayOfMonth() {
        return this.date.getDate();
    }

    dayOfWeek(): string {
        switch (this.date.getDay()) {
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

    month(): string {
        switch (this.date.getMonth()) {
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

    dayAndMonth(): string {
        return this.date.getDate() + " de " + this.month();
    }
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

    constructor(init: number, end:number, day:number, person: Person) {
        this.init = init;
        this.end = end;
        this.day = day;
        this.person = person;
    }
}