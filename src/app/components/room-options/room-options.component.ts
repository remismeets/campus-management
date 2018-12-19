import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-room-options',
  templateUrl: './room-options.component.html',
  styleUrls: ['./room-options.component.scss']
})
export class RoomOptionsComponent implements OnInit {
  nameChecked = true;
  typeChecked = true;
  capacityChecked = false;
  beamerChecked = false;
  occupiedChecked = true;
  @Output() name: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() type: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() capacity: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() beamer: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() occupied: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  emitNameChecked() {
    this.name.emit(this.nameChecked);
  }

  emitTypeChecked() {
    this.type.emit(this.typeChecked);
  }

  emitCapacityChecked() {
    this.capacity.emit(this.capacityChecked);
  }

  emitBeamerChecked() {
    this.beamer.emit(this.beamerChecked);
  }

  emitOccupiedChecked() {
    this.occupied.emit(this.occupiedChecked);
  }
}
