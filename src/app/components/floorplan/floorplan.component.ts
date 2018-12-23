import { Component, OnInit } from '@angular/core';
import {Building} from '../../model/building';
import {Floor} from '../../model/floor';
import {Room} from '../../model/room';
import {RoomComponent} from '../room/room.component';
import {FirebaseService} from '../../services/firebase.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Navigation} from '../../model/navigation';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.scss']
})
export class FloorplanComponent implements OnInit {
  navigation: Navigation;
  nameChecked = true;
  typeChecked = true;
  capacityChecked = false;
  beamerChecked = false;
  occupiedChecked = true;
  selectedRoom: RoomComponent;
  timeOutId: number;

  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {
  }

  setNavigation(navigation: Navigation) {
    this.navigation = navigation;
  }

  getGridArea(index: number) {
    return this.sanitizer.bypassSecurityTrustStyle(this.navigation.rooms[index].row + ' / ' +
      this.navigation.rooms[index].column + ' / ' + 'span ' + this.navigation.rooms[index].spanRow +
      ' / span ' + this.navigation.rooms[index].spanColumn);
  }
}
