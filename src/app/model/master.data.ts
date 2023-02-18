import { Person } from "./model";

export const EMPTY: Person = new Person("", "#FFFFFF");
export const VIO: Person = new Person("Vio", "#B9C2D3");
export const PEDRO: Person = new Person("Pedro", "#4ECF2B");
export const LUCI: Person = new Person("Luci", "#E39CE4");
export const ESTER: Person = new Person("Ester", "#F6EA27");
export const FIDE: Person = new Person("Fide", "#9CBCE4");

export const PERSONS: Person[] = [ EMPTY, VIO, PEDRO, LUCI, ESTER, FIDE];

export const MONDAY = [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]; 
export const TUESDAY = [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]; 
export const WEDNESDAY = [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]; 
export const THURSDAY = [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]; 
export const FRIDAY = [VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, VIO, EMPTY, EMPTY, VIO, VIO]; 
export const SATURDAY = [VIO, VIO, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY]; 
export const SUNDAY = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, VIO, VIO]; 

export const HOUR_LABELS = ['08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h', '20h', '21h', '22h'];
