import {Component, Input, OnInit} from '@angular/core';
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
  backgroundColor: string;

  constructor() {
  }

  ngOnInit() {
    this.change_background();
  }

  change_background() {
    if (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom') {
      if (this.room.occupied === true) {
        this.backgroundColor = 'red';
      } else {
        this.backgroundColor = 'green';
      }
    } else if (this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom' )  {
      const R = (255 * this.room.noise) / this.room.capacity;
      const G = (255 * (this.room.capacity - this.room.noise)) / this.room.capacity;
      const B = 0;
      this.backgroundColor = 'rgb(' + R + ', ' + G + ', ' + B + ')';
    } else {
      this.backgroundColor = 'blue';
    }
  }
}
