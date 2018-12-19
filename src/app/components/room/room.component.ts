import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @Input() room: Room;
  @Input() nameChecked: boolean;
  @Input() typeChecked: boolean;
  @Input() capacityChecked: boolean;
  @Input() beamerChecked: boolean;
  @Input() occupiedChecked: boolean;
  @Output() selectedRoom: EventEmitter<Room> = new EventEmitter<Room>();
  backgroundColor: string;
  selected = false;

  constructor() {
  }

  ngOnInit() {
    this.changeBackground();
  }

  changeBackground() {
    if (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom') {
      if (this.room.occupied === true) {
        this.backgroundColor = '#FF4136';
      } else {
        this.backgroundColor = '#2ECC40';
      }
    } else if (this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom') {
      const R = (255 * this.room.noise) / this.room.capacity;
      const G = (255 * (this.room.capacity - this.room.noise)) / this.room.capacity;
      const B = 0;
      this.backgroundColor = 'rgb(' + R + ', ' + G + ', ' + B + ')';
    } else {
      this.backgroundColor = 'transparant';
    }
  }

  hasSlider() {
    return this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom';
  }

  canReservate() {
    return this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom';
  }

  onRoomClicked() {
    this.selectedRoom.emit(this.room);
    this.selected = true;
    setTimeout(() => {
      this.selected = false;
    }, 5000);
  }
}
