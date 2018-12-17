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
  occupied_style: string;

  constructor() {
  }

  ngOnInit() {
    this.change_background();
  }

  change_background() {
    if (this.room.roomType === 'aula' || this.room.roomType === 'classroom' || this.room.roomType === 'conferenceroom') {
      if (this.room.occupied === true) {
        this.occupied_style = 'occupied listroom';
      } else {
        this.occupied_style = 'not-occupied listroom';
      }
    } else if (this.room.roomType === 'cafetaria' || this.room.roomType === 'studyroom' )  {
      this.occupied_style = 'listroom';
    } else {
      this.occupied_style = 'listroom';
    }
  }
}
