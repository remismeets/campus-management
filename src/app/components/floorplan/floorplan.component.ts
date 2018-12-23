import { Component, OnInit } from '@angular/core';
import {RoomComponent} from '../room/room.component';
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

  onNameChecked(name) {
    this.nameChecked = name;
  }

  onTypeChecked(type) {
    this.typeChecked = type;
  }

  onCapacityChecked(capacity) {
    this.capacityChecked = capacity;
  }

  onBeamerChecked(beamer) {
    this.beamerChecked = beamer;
  }

  onOccupiedChecked(occupied) {
    this.occupiedChecked = occupied;
  }

  onSelectedRoom(selectedRoom) {
    if (this.selectedRoom != null) {
      this.selectedRoom.selected = false;
      clearTimeout(this.timeOutId);
    }
    this.selectedRoom = selectedRoom;
    this.selectedRoom.selected = true;
    this.timeOutId = setTimeout(() => {
      this.selectedRoom.selected = false;
    }, 5000);
  }
}
