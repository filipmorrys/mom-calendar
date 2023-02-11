import { Person } from "../model/model";

const EMPTY: Person = new Person("", "#FFFFFF");
const VIO: Person = new Person("Vio", "#B9C2D3");
const PEDRO: Person = new Person("Pedro", "#4ECF2B");
const LUCI: Person = new Person("Luci", "#E39CE4");
const ESTHER: Person = new Person("Esther", "#F6EA27");
const FIDE: Person = new Person("Fide", "#9CBCE4");

export const initialWeekyCalendar = { 
    "days": [
        { "name": "Lunes", "hours": [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO] }, 
        { "name": "Martes", "hours": [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO] }, 
        { "name": "Miércoles", "hours": [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO] }, 
        { "name": "Jueves", "hours": [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO] }, 
        { "name": "Viernes", "hours": [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO] }, 
        { "name": "Sábado", "hours": [VIO, VIO, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY] }, 
        { "name": "Domingo", "hours": [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, VIO, VIO] }
    ] 
};