import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import {FirebaseService} from '../../services/firebase.service';

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
  @Input() buildingIndex: number;
  @Input() floorIndex: number;
  @Input() roomIndex: number;
  @Output() selectedRoom: EventEmitter<RoomComponent> = new EventEmitter<RoomComponent>();
  backgroundColor: string;
  selected = false;
  hoursReserved = 2;
  intervalId = null;

  constructor(private buildingService: FirebaseService) {
  }

  ngOnInit() {
    this.changeBackground();

    if (this.room.occupied) {
      setInterval(() => this.checkReservedRoom(), 60000);
    }
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

  canReserve() {
    return (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom')
      && this.room.occupied === false;
  }

  onRoomClicked() {
    this.selectedRoom.emit(this);
  }

  reserveRoom() {
    if (this.room.occupied === false) {
      this.room.occupied = true;
      this.room.minutesLeft = this.hoursReserved * 60;
      this.intervalId = setInterval(() => this.checkReservedRoom(), 60000);
      this.changeBackground();
      this.buildingService.updateRoom(this.room, this.buildingIndex, this.floorIndex, this.roomIndex);
    }
  }

  checkReservedRoom() {
    if (this.room.minutesLeft > 0) {
      this.room.minutesLeft -= 1;
    } else {
      this.room.occupied = false;
      clearInterval(this.intervalId);
      this.changeBackground();
    }
    this.buildingService.updateRoom(this.room, this.buildingIndex, this.floorIndex, this.roomIndex);
  }
}
