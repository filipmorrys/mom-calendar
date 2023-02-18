import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ESTER, FIDE, HOUR_LABELS, LUCI, PEDRO } from '../model/master.data';
import { Assignation, Person } from '../model/model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnChanges, OnInit {

  @Input() init: number;
  @Input() end: number;
  @Input() day: number;

  visibility = "hidden";

  hours: any[] = [];
  persons: Person[];
  @Output() onAssignation = new EventEmitter<Assignation>();
  assignation: Assignation;

  ngOnInit(): void {
    this.persons = [FIDE, PEDRO, ESTER, LUCI];
    this.assignation = new Assignation(0, 0, 0, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["init"]) {
      this.init = changes["init"].currentValue;
      console.log("OnChanges init:", this.init);
    }
    if (changes["end"]) {
      this.end = changes["end"].currentValue;
      console.log("OnChanges end:", this.end);
    }
    if (changes["day"]) {
      this.day = changes["day"].currentValue;
      console.log("OnChanges day:", this.day);
    }
    this.initHours();
    this.assignation = new Assignation(this.init, this.end, this.day, FIDE);
  }

  show() {
    this.visibility = "visible";
  }

  hide() {
    this.visibility = "hidden";
  }

  initHours() {
    this.hours.splice(0, this.hours.length);
    console.log("hours antes", this.hours);
    for (let i = this.init; i <= this.end; i++) {
      this.hours.push({ label: HOUR_LABELS[i], index: i });
    }
    console.log("hours despues", this.hours);
  }

  assignPerson(form: any) {
    console.log("Asignación:", this.assignation);
    this.onAssignation.emit(this.assignation);
    this.hide();
  }
}

