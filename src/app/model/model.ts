export class WeeklyCalendar {
    days: Day[];

    constructor(days: Day[]) {
        this.days = days;
    }
}

export class Day {
    name: string;
    hours: Person[];

    constructor(name:string, hours: Person[]) {
        this.name = name;
        this.hours = hours;
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
