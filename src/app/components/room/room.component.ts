import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Room} from '../../model/room';
import {FirebaseService} from '../../services/firebase.service';
import { AngularFireObject } from '@angular/fire/database';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  @Input() nameChecked: boolean;
  @Input() typeChecked: boolean;
  @Input() capacityChecked: boolean;
  @Input() beamerChecked: boolean;
  @Input() occupiedChecked: boolean;
  @Input() buildingId: string;
  @Input() floorId: string;
  @Input() roomId: string;
  @Output() selectedRoom: EventEmitter<RoomComponent> = new EventEmitter<RoomComponent>();
  backgroundColor: string;
  selected = false;
  hoursReserved = 2;
  intervalId = null;
  room: Room;
  roomRef: AngularFireObject<any>;
  isReserved: boolean;
  isAvailable: boolean;
  minutesLeft: number;

  constructor(private firebaseService: FirebaseService) {
  }

  ngOnInit() {
    this.roomRef = this.firebaseService.getRoom(this.buildingId, this.floorId, this.roomId);
    this.roomRef.valueChanges().subscribe(room => {
        this.room = room as Room;
        this.changeBackground();
        if (this.room.occupied) {
          if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
          }
          this.intervalId = setInterval(() => this.checkReservedRoom(), 5000);
          this.checkReservedRoom();
        }
      },
      error => {
        console.log(error as string);
      });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  changeSlider() {
    this.roomRef.update(this.room).then(() => {
      this.changeBackground();
    })
      .catch(err => console.log(err));
  }

  changeBackground() {
    if (this.room != null) {
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
  }

  hasSlider() {
    return this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom';
  }

  canReserve() {
    return (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom')
      && this.room.occupied === false;
  }

  isOccupied() {
    return (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom')
      && this.room.occupied === true;
  }

  onRoomClicked() {
    this.selectedRoom.emit(this);
  }

  reserveRoom() {
    if (this.room.occupied === false) {
      this.room.occupied = true;
      this.room.timeStamp = (this.hoursReserved * 60000) + Date.now();
      this.roomRef.update(this.room).then(() => {
        this.isReserved = true;
        setTimeout(() => this.isReserved = false, 2000);
      })
        .catch(err => console.log(err as string));
    }
  }

  checkReservedRoom() {
    if (this.room.timeStamp < Date.now()) {
      this.room.occupied = false;
      this.room.timeStamp = 0;
      clearInterval(this.intervalId);
      this.intervalId = null;
      this.changeBackground();

      this.roomRef.update(this.room).then(() => {
        this.isAvailable = true;
        setTimeout(() => this.isAvailable = false, 2000);
      })
        .catch(err => console.log(err));
    } else {
      this.minutesLeft = Math.round((this.room.timeStamp - Date.now()) / 60000);
    }
  }
}
